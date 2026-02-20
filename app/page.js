import Link from "next/link";
import { getSiteData } from "@/lib/data";
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
  return (<>
    <h1>Top Page</h1>
    <Link href="/posts/">記事一覧</Link>
  </>);
}