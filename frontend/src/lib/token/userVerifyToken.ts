import { jwtVerify } from 'jose';
import { NextRequest } from 'next/server';

export const userVerifyToken = async (userToken: string, req: NextRequest): Promise<boolean> => {
  const secret = process.env.NEXT_PUBLIC_JWT_SECRET;
  const authHeader = req.headers.get('authorization');
  console.log('token'+authHeader);
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }
  const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    console.log('payload'+payload);
    
    return !!payload;

  } catch (error) {
    console.error('Token verification failed:', error);
    return false;
  }
};
