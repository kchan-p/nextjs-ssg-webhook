import { getContentsData } from "@/lib/data";
import {purify,stripHtmlTags} from "@/lib/purify";

export const dynamic = "force-static";

export const metadata = {
  title: "コンテンツ一覧",
  description: "コンテンツ一覧です"
};

export default async function Page() {
  const posts = await getContentsData();

  return (
    <main>
      <h1>コンテンツ一覧</h1>
      <p>&nbsp;</p>
      <p>ページ生成日時：{new Date().toLocaleString("ja-JP")}</p>
      <p>fetch日時:{new Date(posts.fetchDate).toLocaleString("ja-JP")}</p>
      <p>&nbsp;</p>
      <ul>
        {posts.data.map(post => (
            <li key={post.slug}>
              <a href={`/posts/${post.slug}`}>
                {stripHtmlTags(post.title)}
              </a>:{stripHtmlTags(post.content).slice(0, 120) + "..."}
            </li>
          ))}
      </ul>
    </main>
  );
}