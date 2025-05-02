import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.NEXT_PUBLIC_JWT_SECRET;

    await jwtVerify(token, new TextEncoder().encode(secret));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 401 });
  }
}
