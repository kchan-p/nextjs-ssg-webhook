import { getContentsData } from "@/lib/data";

export const dynamic = "force-static";

export const metadata = {
  title: "コンテンツ一覧",
  description: "コンテンツ一覧です"
};

export default async function Page() {
  const posts = await getContentsData();

  return (
    <main>
      <h1>Posts</h1>
      <p>&nbsp;</p>
      <p>生成日：{new Date().toLocaleString("ja-JP")}</p>
      <p>&nbsp;</p>
      <p>コンテンツ一覧</p>
      <ul>
        {posts.map(post => (
            <li key={post.slug}>
              <a href={`/posts/${post.slug}`}>
                {post.title}
              </a>:{post.content.slice(0, 120) + "..."}
              <p>{post.date}</p>
              <p>{post.mdate}</p>
            </li>
          ))}
      </ul>
    </main>
  );
}