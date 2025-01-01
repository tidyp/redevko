import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  console.log(req.nextUrl.searchParams.get('id'));
  return NextResponse.json({ message: 'test' });
};
