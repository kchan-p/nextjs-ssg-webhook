import { revalidateTag } from "next/cache";
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { TAG_POSTS, TAG_SLUG, TAG_LATEST } from "@/lib/fetchtag";

let lastRequestTime = 0;

export async function GET(req) {

  // 5秒に一回のみ受け付け
  const now = Date.now();
  if (now - lastRequestTime < 5000) {
    return Response.json(
      { message: "Too Many Requests" },
      { status: 429 }
    );
  }
  lastRequestTime = now;

  const headerList = await headers();
  if (headerList.get("origin") === process.env.SITE_URL) {
    return Response.json({ message: "Invalid origin" }, { status: 401 });
  }

  const searchParams = req.nextUrl.searchParams;

  const secret = searchParams.get("secret");
  if (secret !== process.env.SECRET_KEY) {
    return Response.json({ message: "Invalid secret" }, { status: 401 });
  }



  const slug = searchParams.get("slug");
  if (!slug) {
    return Response.json({ message: "Invalid slug" }, { status: 401 });
  }
  revalidateTag(TAG_SLUG(slug), "max");
  revalidateTag(TAG_POSTS(), "max");
  revalidateTag(TAG_LATEST(), "max");

  return NextResponse.json({ success: true, slug: slug });
}