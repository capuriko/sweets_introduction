import fs from "fs";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
export default function Post({ post }) {
  return (
    <>
      <h1>{post.mdx.frontmatter.shopName}</h1>
      <h2>場所：{post.mdx.frontmatter.address}</h2>
      <MDXRemote {...post.mdx} />
    </>
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
  // propsを通じてpostをページに渡す
  return { props: { post: { shopName: params.shopName, mdx: mdxSource } } };
}
