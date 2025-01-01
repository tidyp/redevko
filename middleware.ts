// import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/nextAuth/auth';

// export function middleware(request: NextRequest) {
//   return NextResponse.redirect(new URL('/', request.url));
// }

// auth의 callback 함수를 middleware로 사용
export const middleware = auth;

export const config = {
  matcher: ['/new', '/profile'],
};
