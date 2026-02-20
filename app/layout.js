import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import { getSiteData } from "@/lib/data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


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
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header>--{siteData.siteTitle}--</header>
        <Link href="/">
          ホームへ戻る
        </Link>
        {children}
      </body>
    </html>
  );
}
