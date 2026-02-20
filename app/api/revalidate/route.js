import { revalidatePath } from "next/cache";
import { NextResponse } from 'next/server';


  // 暫定（環境変数等で指定）
const secretKey = "xxxx";

/* 
export async function POST(req) {
  const body = await req.json();
  if (body.secret !== secretKey) {
    return Response.json({ message: "Invalid secret" }, { status: 401 });
  }
  const slug = body.slug;

  if (slug) revalidatePath(`/posts/${slug}`);
  revalidatePath(`/posts`);

  return NextResponse.json({ success: true , slug:slug});
}
*/
export async function GET(req) {
  const request = await req;
  const { searchParams } = new URL(request.url);

  const secret = searchParams.get("secret");
  if (secret !== secretKey) {
    return Response.json({ message: "Invalid secret" }, { status: 401 });
  }

  const slug = searchParams.get("slug");

  if (slug) revalidatePath(`/posts/${slug}`);
  revalidatePath(`/posts`);

  return NextResponse.json({ success: true , slug:slug});
}