import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest): Promise<NextResponse> {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "member") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.json({
    session
  })
}

export { default } from '../../layout';
