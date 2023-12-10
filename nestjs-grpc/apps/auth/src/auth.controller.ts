import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import {
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
} from '@app/common/types/auth';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod('AuthService', 'Register')
  async register(data: RegisterRequest): Promise<RegisterResponse> {
    return await this.authService.register(data);
  }

  @GrpcMethod('AuthService', 'Login')
  async login(data: LoginRequest): Promise<LoginResponse> {
    return await this.authService.login(data);
  }
}
