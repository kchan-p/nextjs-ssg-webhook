import Link from "next/link";
import { getSiteData,getTopData } from "@/lib/data";
import {purify,stripHtmlTags} from "@/lib/purify";

export const dynamic = "force-static";

// メタデータの生成
export async function generateMetadata() {
  const siteData = await getSiteData();
  const {siteTitle,siteDescription} = siteData.data;

  return {
    title: stripHtmlTags(siteTitle),
    description: stripHtmlTags(siteDescription)
  };
}
export default async function Page() {
  const post = await getTopData();
  if( !post ) notFound();

  const {title,content} = post.data;

  return (<>
    <h1>{stripHtmlTags(title)}</h1>
    <p>fetch日時:{new Date(post.fetchDate).toLocaleString("ja-JP")}</p>
    <Link href="/posts/">記事一覧</Link>
    <div dangerouslySetInnerHTML={{ __html: purify(content) }} />
  </>);
}