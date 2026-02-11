import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/admin'],
};

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function middleware(req: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  const cookie = req.cookies.get('admin_session')?.value;
  if (!cookie) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  const expectedHash = await hashPassword(adminPassword);
  if (cookie !== expectedHash) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  return NextResponse.next();
}
