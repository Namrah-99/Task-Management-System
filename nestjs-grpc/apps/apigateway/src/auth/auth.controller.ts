import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequest, LoginRequest } from '@app/common/types/auth';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(@Body() data: RegisterRequest): Promise<any> {
    try {
      const response = await this.authService.register(data);
      console.log('response: ', response);
      return { message: response.message, userId: response.userId };
    } catch (error) {
      console.log('Error in registration:', error);
      throw error;
      // if (error.details && error.details.code === 'REGISTRATION_FAILED') {
      //   // Forward the original error message
      //   throw new HttpException(error.details.message, HttpStatus.BAD_REQUEST);
      // } else {
      //   // Handle other errors or provide a generic error message
      //   throw new HttpException(`Registration failed: ${error.message}`, HttpStatus.BAD_REQUEST);
      // }
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
