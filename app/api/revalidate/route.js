import { revalidateTag } from "next/cache";
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

let lastRequestTime = 0;

export async function GET(req) {
  
  const headerList = await headers();
  if( headerList.get("origin") === process.env.SITE_URL ){
    return Response.json({ message: "Invalid origin" }, { status: 401 });
  }

  const searchParams  = req.nextUrl.searchParams;

  const secret = searchParams.get("secret");
  if (secret !== process.env.SECRET_KEY) {
    return Response.json({ message: "Invalid secret" }, { status: 401 });
  }

    // 5秒に一回のみ受け付け
  if (Date.now() - lastRequestTime < 5000) {
    return Response.json(
      { message: "Too Many Requests" },
      { status: 429 }
    );
  }

  const slug = searchParams.get("slug");
  if (slug) {
    return Response.json({ message: "Invalid slug" }, { status: 401 });
  }
  revalidateTag(`posts-${slug}`, "max");
  revalidateTag("posts", "max");
  revalidateTag("latest-posts", "max");

  return NextResponse.json({ success: true , slug:slug});
}