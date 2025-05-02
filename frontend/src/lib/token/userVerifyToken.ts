import { jwtVerify } from 'jose';
import { NextRequest } from 'next/server';

export const userVerifyToken = async (userToken: string, req: NextRequest): Promise<any> => {
try {
  const secret = process.env.NEXT_PUBLIC_JWT_SECRET
  const token = localStorage.getItem('userAccessToken');
  if (!token) {
    return; // No token, no verification needed
  }
  const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
  console.log(payload);
  return !!payload;
} catch (error) {
  console.error('Token verification failed:', error);
  return false;
}
};
