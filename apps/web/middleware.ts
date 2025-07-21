import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { token } = req.nextauth;
    // If not logged in, let NextAuth handle redirect
    if (!token) return NextResponse.next();

    // Role-based routing
    const role = token.role;
    const url = req.nextUrl.clone();
    if (url.pathname === "/auth") {
      // Already on login page, let through
      return NextResponse.next();
    }
    if (role === "QAC" && !url.pathname.startsWith("/qc")) {
      url.pathname = "/qc";
    }
    if (role === "HOD" && !url.pathname.startsWith("/hod")) {
      url.pathname = "/hod";
      return NextResponse.redirect(url);
    }
    if (role === "FACULTY" && !url.pathname.startsWith("/faculty")) {
      url.pathname = "/faculty";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = {
  matcher: ["/((?!auth|_next|favicon.ico|api|static|public).*)"],
};
