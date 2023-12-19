import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequest, LoginRequest, LogoutRequest } from '@app/common/types/auth';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { RpcException } from '@nestjs/microservices';

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
      console.log('Error in registration (apigateway grpc client) :', error.message);

      // Check if the error has a specific message
      if (error?.message.includes('User with this email already exists') || (error?.message.includes('Invalid password'))) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }else {
        // Handle other errors generically
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  @Post('login')
  async login(@Body() data: LoginRequest): Promise<any> {
    try {
      const response = await this.authService.login(data);
      console.log('response: ', response);
      return { access_token: response.accessToken };
    } catch (error) {
      console.log('Error in Login (apigateway grpc client) :', error.message);

      // Check if the error has a specific message
      if (error?.message.includes('Invalid credentials') || error?.message.includes('Invalid password')) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        // Handle other errors generically
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  @Post('logout')
  async logout(@Body() data: LogoutRequest): Promise<any> {
    try {
      return this.authService.logout(data.userId);
    } catch (error) {
      console.log('Error during logout:', error.message);
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
