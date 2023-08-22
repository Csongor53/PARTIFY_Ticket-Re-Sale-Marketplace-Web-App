import {NextRequest, NextResponse, URLPattern} from "next/server";
import {getToken} from "next-auth/jwt";

/*const PATTERNS = [
    [
        new URLPattern({pathname: '/:p'}),
        ({pathname}) => pathname.groups,
    ],
];

const params = (url) => {
    const input = url.split('?')[0]
    let result = {}

    for (const [pattern, handler] of PATTERNS) {
        const patternResult = pattern.exec(input)
        if (patternResult !== null && 'pathname' in patternResult) {
            result = handler(patternResult)
            break
        }
    }
    return result
}*/

export async function middleware(request) {
    const session = await getToken({
        req: request,
        secret: process.env.AUTH_SECRET,
    });

    const {pathname} = request.nextUrl;
    // if (pathname.startsWith("/_next")) return NextResponse.next();

    // http://localhost:3000/api/auth/verify-request?provider=email&type=email
    // http://localhost:3000/auth/login/complete?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Flogin%3Femail%3Dnidrakoydu%2540gufum.com

    /*console.log("Before if: ")
    console.log(request.nextUrl)
    if (
      !session?.user?.accComplete &&
      request.nextUrl.pathname !== "/auth/login/complete" &&
      request.nextUrl.pathname !== "/auth/login" &&
      request.nextUrl.pathname !== '/api/auth/verify-request'
    ) {
      request.nextUrl.pathname = "/auth/login/complete";
        console.log("Inside if: ")
        console.log(request.nextUrl)
      return NextResponse.redirect(request.nextUrl);
    }*/


    return NextResponse.next();
}
