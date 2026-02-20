import { getPostsData } from "@/lib/data";

export const revalidate = false;
export const dynamic = "force-static";

export const metadata = {
  title: "コンテンツ一覧",
  description: "コンテンツ一覧です"
};

export default async function PostsPage() {
  const posts = await getPostsData();

  return (
    <main>
      <h1>Posts</h1>
      <p>&nbsp;</p>
      <p>生成日：{new Date().toLocaleString()}</p>
      <p>&nbsp;</p>
      <p>コンテンツ一覧</p>
      <ul>
      {posts.map(post => (
        <li key={post.slug}>
          <a href={`/posts/${post.slug}`}>
            {post.title}
          </a>
        </li>
      ))}
      </ul>
    </main>
  );
}