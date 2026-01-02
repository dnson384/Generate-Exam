import { NextRequest, NextResponse } from "next/server";

const REAL_BACKEND_URL = process.env.BACKEND_URL;

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    const slug = (await params).slug.join("/");

    const imageUrl = `${REAL_BACKEND_URL}/${slug}`;

    const imageResponse = await fetch(imageUrl, {
      cache: "no-store",
    });

    if (!imageResponse.ok) {
      return new NextResponse(null, {
        status: imageResponse.status,
        statusText: imageResponse.statusText,
      });
    }

    const contentType = imageResponse.headers.get("Content-Type");
    const imageBlob = await imageResponse.blob();

    return new NextResponse(imageBlob, {
      status: 200,
      headers: {
        ...(contentType && { "Content-Type": contentType }),
      },
    });
  } catch (err) {
    console.error("Lỗi Image Proxy:", err);
    return new NextResponse(null, { status: 500 });
  }
}
