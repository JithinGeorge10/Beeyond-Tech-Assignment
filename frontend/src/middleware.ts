import { NextRequest, NextResponse } from 'next/server'
import { userVerifyToken } from './lib/token/userVerifyToken';

export async function middleware(req: NextRequest) {
    const isValidUser = await userVerifyToken("userAccessToken", req);
    console.log(isValidUser);
    
    

    return NextResponse.next();
}