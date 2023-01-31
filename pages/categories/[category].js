import fs from "fs";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { categoryNames } from "../../constant";

export default function Post({ shops, category }) {
  return (
    <div style={{ padding: "20px" }}>
      <h1>{categoryNames[category]}のお店一覧</h1>
      {shops.map((elem) => (
        <a href={`/posts/${elem.articleName}`}>
          <div style={{ border: "1px solid black" }}>
            <div style={{ display: "flex" }}>
              <img
                style={{ width: "20vw", height: "30vh" }}
                src={elem.thumbNailUrl}
              ></img>
              <div style={{ padding: "20px 40px 0px" }}>
                <h2>店名：{elem.shopName}</h2>
                <h2>場所：{elem.station}</h2>
              </div>
            </div>
            {/* 記事の冒頭 */}
          </div>
        </a>
      ))}
    </div>
  );
}

//
export async function getStaticPaths() {
  const markdownFolder = "./markdown/";
  const allCategory = new Set(); //set()で重複しているものを一意にする
  await Promise.all(
    fs.readdirSync(markdownFolder).map(async (fileName) => {
      const text = fs.readFileSync(`./markdown/${fileName}`, "utf-8");
      const mdxSource = await serialize(text, { parseFrontmatter: true });
      mdxSource.frontmatter.category.forEach((category) => {
        allCategory.add(category);
      });
    })
  );
  // allCategoryはSet()型なので配列に変換しなおす必要がある。
  const arr = Array.from(allCategory);

  //   const paths = ["cake","chocolate","pudding"].map((category) => ({
  //     params: { category }, // <- shorhand of { category: category }
  //   }));
  // object型はkeyとvalueのセット
  const paths = arr.map((category) => ({
    params: { category }, // <- shorhand of { category: category }
  }));
  return { paths, fallback: false };
}

// この関数もビルド時に呼ばれる
export async function getStaticProps({ params }) {
  const markdownFolder = "./markdown/";
  const shops = [];
  await Promise.all(
    fs.readdirSync(markdownFolder).map(async (fileName) => {
      const text = fs.readFileSync(`./markdown/${fileName}`, "utf-8");
      const mdxSource = await serialize(text, { parseFrontmatter: true });
      if (mdxSource.frontmatter.category.includes(params.category)) {
        shops.push({
          articleName: fileName.replace(".md", ""),
          thumbNailUrl: mdxSource.frontmatter.thumbNailUrl ?? null,
          shopName: mdxSource.frontmatter.shopName,
          station: mdxSource.frontmatter.station ?? null,
        });
      }
    })
  );
  // propsを通じてshopsをページに渡す
  return { props: { shops, category: params.category } };
}
