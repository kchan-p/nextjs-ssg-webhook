import Link from "next/link";
import { Potta_One } from "next/font/google";
import { getSiteData } from "@/lib/data";
import { Sidebar } from "@/sidebar/sidebar";
import "./globals.css";



const pottaOne = Potta_One({ weight: "400" });

// メタデータの生成
export async function generateMetadata() {
  const siteData = await getSiteData();
  const {siteTitle} = siteData.data;

  return {
    title: {
      default: siteTitle,
      template: `%s | ${siteTitle}`
    }
  };
}
export default async function RootLayout({ children }) {
  const siteData = await getSiteData();
  const {siteTitle} = siteData.data;

  return (
    <html lang="ja">
      <body className={`${pottaOne.className}`}>
        <header>--{siteTitle}--</header>
        <div className="wrap">
          <div className="content">
            <Link href="/" className="navi">
              ホームへ戻る
            </Link>
            {children}
          </div>
          <div className="sidebar">
            <Sidebar />
          </div>
        </div>
      </body>
    </html>
  );
}
