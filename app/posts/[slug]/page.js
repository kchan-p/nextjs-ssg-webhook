import { getPostsData , getPostData } from "@/lib/data";
import { notFound } from "next/navigation";
export const revalidate = false;
export const dynamic = "force-static";

export async function generateStaticParams() {
  const posts = await getPostsData();

  return posts.map(post => ({
    slug: post.slug,
  }));
}

const getData = async (params)=>{
  const {slug} = await params;

  const post = await getPostData(slug);

  if( !post ) notFound();

  return post;
};
  // メタデータの生成
export async function generateMetadata({ params }) {
  const post = await getData(params);

  return {
    title: post.title,
    description: post.content.slice(0, 120),
    openGraph: {
      title: post.title,
      description: post.content.slice(0, 120),
    }
  };
}
export default async function Page({ params }) {
  const post = await getData(params);

  return (
    <main>
      <h1>{post.title}</h1>
      <p>&nbsp;</p>
      <p>{post.content}</p>
      <p>生成日：{new Date().toLocaleString()}</p>
      <p>&nbsp;</p>
      <p><a href={`/api/revalidate?slug=${post.slug}&secret=xxxx`} target="_blank">[再生成]</a></p>
      <p>※再生成クリック後ブラウザ再読み込み</p>
    </main>
  );
}