import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { UnauthorizedException } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginData: { email: string; password: string }): Promise<{ user: any; access_token: string }> {
    try {
      const result = await this.authService.login(loginData.email, loginData.password);
      console.log('Login result:', result);
      return result;
    } catch (error) {
      console.error('Login error:', error);
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException(error.message);
      }
      throw error;
    }
  }
  
  @Post('register')
  async register(@Body() userData: { email: string; password: string; name: string }) {
    console.log('Register endpoint hit:', userData);
    try {
      const result = await this.authService.register(userData);
      console.log('Registration successful:', result);
      return result;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }
}