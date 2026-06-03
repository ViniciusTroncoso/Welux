import { NextRequest, NextResponse } from "next/server";

// A/B test on the homepage only: 50/50 split, sticky per visitor via cookie.
//  - variant "b" (default): the new Welux clone (this Next app's home page)
//  - variant "a": the previous Welux site (algarys-clone), embedded under /legacy
export const config = {
  matcher: "/",
};

const COOKIE = "ab-variant";

export function middleware(req: NextRequest) {
  const existing = req.cookies.get(COOKIE)?.value;
  const variant =
    existing === "a" || existing === "b"
      ? existing
      : Math.random() < 0.5
        ? "a"
        : "b";

  let res: NextResponse;
  if (variant === "a") {
    const url = req.nextUrl.clone();
    url.pathname = "/legacy/index.html";
    res = NextResponse.rewrite(url);
  } else {
    res = NextResponse.next();
  }

  if (existing !== variant) {
    res.cookies.set(COOKIE, variant, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  }
  return res;
}
