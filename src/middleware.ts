import {fetchAuthSession} from "aws-amplify/auth/server";
import {NextRequest, NextResponse} from "next/server";
import {runWithAmplifyServerContext} from "./utils/server-utils";

//This component handle your routes before the actual page is loaded. If there is no auth session then redirect to
//login page and otherwise show requested page.
export async function middleware(request: NextRequest) {
    const response = NextResponse.next();

    const authenticated = await runWithAmplifyServerContext({
        nextServerContext: {request, response},
        operation: async (contextSpec) => {
            try {
                const session = await fetchAuthSession(contextSpec);
                return session.tokens !== undefined;
            } catch (error) {
                console.log(error);
                return false;
            }
        },
    });

    if (authenticated) {
        return response;
    }

    const parsedURL = new URL(request.url);
    const path = parsedURL.pathname;

    return NextResponse.redirect(new URL(`/login?origin=${path}`, request.url));
}

export const config = {

    // matcher: [
    //   /*
    //    * Match all request paths except for the ones starting with:
    //    * - api (API routes)
    //    * - _next/static (static files)
    //    * - _next/image (image optimization files)
    //    * - favicon.ico (favicon file)
    //    */
    //   // "/((?!api|_next/static|_next/image|favicon.ico|login).*)",
    //   "/((?!api|_next/static|_next/image|favicon.ico|login|events|profile).*)",
    // ],
    // PUT MORE paths to protect to this array
    //In matcher add the pages that you want to be authenticated. You can also do it the other way
    // around. So have everything authenticated , except
    matcher: ["/todos/:path*"],
};
