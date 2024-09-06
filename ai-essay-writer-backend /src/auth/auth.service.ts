import { Injectable, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { email: user.email, sub: user.id };
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(userData: { email: string; password: string; name: string }) {
    try {
      const existingUser = await this.usersService.findOneByEmail(userData.email);
      if (existingUser) {
        throw new ConflictException('User already exists');
      }
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        throw error;
      }
      // If user is not found, proceed with registration
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = await this.usersService.create({
      email: userData.email,
      password: hashedPassword,
      name: userData.name,
    });

    const { password, ...result } = newUser;
    return result;
  }
}