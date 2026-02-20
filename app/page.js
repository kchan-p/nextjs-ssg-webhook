import Link from "next/link";
import { getSiteData,getPostData } from "@/lib/data";
export const revalidate = false;
export const dynamic = "force-static";

// メタデータの生成
export async function generateMetadata() {
  const siteData = await getSiteData();

  return {
    title: siteData.siteTitle,
    description: siteData.siteDescription
  };
}
export default async function Page() {
  const post = await getPostData("top");

  if( !post ) notFound();

  return (<>
    <h1>{post.title}</h1>
    <Link href="/posts/">記事一覧</Link>
    <p>{post.content}</p>
  </>);
}