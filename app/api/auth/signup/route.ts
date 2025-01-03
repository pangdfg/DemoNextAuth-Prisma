import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { email, password, name }: { email: string; password: string; name: string } = await request.json();
    
    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    return NextResponse.json({ message: 'User created', user });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'User could not be created' }, { status: 500 });
  }
}
