import { getContentData,getContentsData } from "@/lib/data";
import { notFound } from "next/navigation";

export const dynamic = "force-static";

const getData = async (params)=>{
  const {slug} = await params;

  const post = await getContentData(slug);

  if( !post ) notFound();

  return post;
};

export async function generateStaticParams() {
  const posts = await getContentsData();

  return posts.map(post => ({
    slug: post.slug,
  }));
}

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
      <p>ページ生成日時：{new Date().toLocaleString("ja-JP")}</p>
      <p>データ生成日時：{new Date(post.mdate).toLocaleString("ja-JP")}</p>
      <p>&nbsp;</p>
      <p><a href={`/api/revalidate?slug=${post.slug}&secret=${process.env.SECRET_KEY}`} target="_blank">[再生成]</a></p>
      <p>※再生成クリック後ブラウザ再読み込み</p>
    </main>
  );
}