import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { ApiTags } from '@nestjs/swagger';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
@Post('login')
async login(@Request() req: any): Promise<{ user: any; access_token: string }> {
  const { access_token } = await this.authService.login(req.user);
  return { user: req.user, access_token };
}}