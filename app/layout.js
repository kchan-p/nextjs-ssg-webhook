import Link from "next/link";
import { Potta_One } from "next/font/google";
import { getSiteData } from "@/lib/data";
import "./globals.css";

const pottaOne = Potta_One({ weight: "400" });


// メタデータの生成
export async function generateMetadata() {
  const siteData = await getSiteData();

  return {
    title: {
      default: siteData.siteTitle,
      template: `%s | ${siteData.siteTitle}`
    }
  };
}
export default async function RootLayout({ children }) {
  const siteData = await getSiteData();

  return (
    <html lang="ja">
      <body className={`${pottaOne.className}`}>
        <header>--{siteData.siteTitle}--</header>
        <Link href="/" className="navi">
          ホームへ戻る
        </Link>
        {children}
      </body>
    </html>
  );
}
