import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/userRepository';
import { Prisma } from '@prisma/client';

const userRepository = new UserRepository();

export class AuthService {
  async register(data: Prisma.UserCreateInput) {
    const existingUser = await userRepository.findByPhone(data.phone);
    if (existingUser) {
      throw new Error('Phone number is already registered');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    const newUser = await userRepository.create({
      ...data,
      password: hashedPassword,
    });

    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  async login(phone: string, passwordString: string) {
    const user = await userRepository.findByPhone(phone);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(passwordString, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '7d' }
    );

    const { password, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  }
}
