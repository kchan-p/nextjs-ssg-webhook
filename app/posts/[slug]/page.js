import { getContentData,getContentsData } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import {purify,stripHtmlTags} from "@/lib/purify";

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
  const title = stripHtmlTags(post.data.title);
  const content = purify(post.data.content);

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
  const title = stripHtmlTags(post.data.title);
  const content = purify(post.data.content);
  const slug = post.data.slug;

  return (
    <main>
      <h1>{title}</h1>
      <p>&nbsp;</p>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <p>ページ生成日時：{new Date().toLocaleString("ja-JP")}</p>
      <p>fetch日時:{new Date(post.fetchDate).toLocaleString("ja-JP")}</p>
      <p>&nbsp;</p>
      <p><Link href={`/api/revalidate?slug=${slug}&secret=${process.env.SECRET_KEY}`} target="_blank">[再生成]</Link></p>
      <p>※再生成クリック後ブラウザ再読み込み</p>
    </main>
  );
}