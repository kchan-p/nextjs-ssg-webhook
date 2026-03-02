import { getLatestData } from "@/lib/data";
import Link from "next/link";
import {stripHtmlTags} from "@/lib/purify";

export async function Sidebar(){
    const latest = await getLatestData();
    return (<div>
        <p>新着一覧</p>
        <p>fetch日時:{new Date(latest.fetchDate).toLocaleString("ja-JP")}</p>
        <ul>
        {latest.data.map(l => (
            <li key={l.slug}>
              <Link href={`/posts/${l.slug}`}>
                {stripHtmlTags(l.title)}
              </Link>:({(new Date( l.date )).toLocaleDateString("ja-JP")})
            </li>
          ))}
      </ul>
    </div>);
}