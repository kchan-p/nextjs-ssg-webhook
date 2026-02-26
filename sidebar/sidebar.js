import { getLatestData } from "@/lib/data";
export async function Sidebar(){
    const latest = await getLatestData();
    return (<div>
        <p>新着一覧</p>
        <ul>
        {latest.map(l => (
            <li key={l.slug}>
              <a href={`/posts/${l.slug}`}>
                {l.title}
              </a>:({(new Date( l.date )).toLocaleDateString("ja-JP")})
            </li>
          ))}
      </ul>
    </div>);
}