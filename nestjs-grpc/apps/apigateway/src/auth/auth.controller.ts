import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequest, LoginRequest } from '@app/common/types/auth';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() data: RegisterRequest): Promise<any> {
    try {
      const response = await this.authService.register(data);
      return { message: response.message, userId: response.userId };
    } catch (error) {
      throw new HttpException('Registration failed', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  async login(@Body() data: LoginRequest): Promise<any> {
    try {
      const response = await this.authService.login(data);
      return { access_token: response.accessToken };
    } catch (error) {
      throw new HttpException('Login failed', HttpStatus.UNAUTHORIZED);
    }
  }
}
