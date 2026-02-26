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

  return posts.data.map(post => ({
    slug: post.slug,
  }));
}

  // メタデータの生成
export async function generateMetadata({ params }) {
  const post = await getData(params);
  const {title,content} = post.data;

  return {
    title: title,
    description: content.slice(0, 120),
    openGraph: {
      title: title,
      description: content.slice(0, 120),
    }
  };
}
export default async function Page({ params }) {
  const post = await getData(params);
  const {title,content,slug} = post.data;

  return (
    <main>
      <h1>{title}</h1>
      <p>&nbsp;</p>
      <p>{content}</p>
      <p>ページ生成日時：{new Date().toLocaleString("ja-JP")}</p>
      <p>fetch日時:{new Date(post.fetchDate).toLocaleString("ja-JP")}</p>
      <p>&nbsp;</p>
      <p><a href={`/api/revalidate?slug=${slug}&secret=${process.env.SECRET_KEY}`} target="_blank">[再生成]</a></p>
      <p>※再生成クリック後ブラウザ再読み込み</p>
    </main>
  );
}