import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const registerUser = async (email: string, password: string, name: string) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
    return user;
  } catch (error: any) {
    if (error.code === 'P2002' && error.meta?.modelName === 'User' && error.meta?.target?.includes('email')) {
      throw new Error('Email already in use');
    } else {
      throw new Error('Failed to register user');
    }
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      const error = new Error('User not found');
      (error as any).statusCode = 404;
      throw error;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      const error = new Error('Invalid password');
      (error as any).statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    return token;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to login user');
  }
};
