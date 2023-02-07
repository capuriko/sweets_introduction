import fs from "fs";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
export default function Post({ post }) {
  return (
    <div style={{ padding: "20px" }}>
      <h1>{post.mdx.frontmatter.shopName}</h1>
      <h2>場所：{post.mdx.frontmatter.address}</h2>
      {/* ...の意味： スプレッド記法。next-mdx-remoteは、getServerProps や getStaticProps によって、Markdown を読み込むためのもの　*/}
      <MDXRemote {...post.mdx} />
    </div>
  );
}

export async function getStaticPaths() {
  const markdownFolder = "./markdown/";
  const paths = fs.readdirSync(markdownFolder).map((file) => ({
    params: { shopName: file.replace(".md", "") },
  }));
  return { paths, fallback: false };
}

// この関数もビルド時に呼ばれる
export async function getStaticProps({ params }) {
  const text = fs.readFileSync(`./markdown/${params.shopName}.md`, "utf-8");
  const mdxSource = await serialize(text, { parseFrontmatter: true });
  // propsを通じてpostをページに渡す→ページのURLが「ホスト名/posts/a-tes-souhaits」で表示される
  return { props: { post: { shopName: params.shopName, mdx: mdxSource } } };
}
