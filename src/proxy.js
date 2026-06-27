

import { NextResponse } from 'next/server';
import { auth } from './lib/auth';


export async function proxy(request) {
    // console.log(request, "rq")
    const session = await auth.api.getSession({
        headers: request.headers,
    });


    if (session) {
        return NextResponse.next()
    }


    // requested page
    const pathname = request.nextUrl.pathname;


    // login url
    const loginUrl = new URL("/signin", request.url);

    // save redirect page
    loginUrl.searchParams.set("redirect", pathname);

    return NextResponse.redirect(loginUrl);
}

export const config = {
    matcher: ["/api/payment"],
}