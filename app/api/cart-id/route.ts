import { NextResponse } from "next/server";

const CART_ID_COOKIE = "deadsaint_cart_id";

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24 * 30,
};

export async function GET(request: Request) {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const match = cookieHeader.match(
    new RegExp(`(?:^|;\\s*)${CART_ID_COOKIE}=([^;]*)`),
  );

  return NextResponse.json({ cartId: match ? decodeURIComponent(match[1]) : null });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { cartId?: unknown } | null;
  const cartId = typeof body?.cartId === "string" ? body.cartId.trim() : "";

  if (!cartId || cartId.length > 256) {
    return NextResponse.json({ error: "Invalid cart ID" }, { status: 400 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(CART_ID_COOKIE, cartId, cookieOptions);
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(CART_ID_COOKIE, "", {
    ...cookieOptions,
    maxAge: 0,
  });
  return response;
}
