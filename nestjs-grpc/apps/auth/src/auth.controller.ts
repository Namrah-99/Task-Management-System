import { BadRequestException, Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import {
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
} from '@app/common/types/auth';
import { AppErrors } from '@app/common/modules/error.constants';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @GrpcMethod('AuthService', 'Register')
  async register(data: RegisterRequest): Promise<RegisterResponse> {
    try {
      return await this.authService.register(data);
    } catch (error) {
      console.log('Error in registration:', error.message);
      if (error instanceof RpcException) {
        throw error; // Rethrow gRPC compatible error
      } else {
        throw new RpcException(AppErrors.INTERNAL_SERVER_ERROR);
      }
    }
  }

  @GrpcMethod('AuthService', 'Login')
  async login(data: LoginRequest): Promise<LoginResponse> {
    try {
      return await this.authService.login(data);
    } catch (error) {
      console.log('Error in Login:', error.message);
      if (error instanceof RpcException) {
        throw error; // Rethrow gRPC compatible error
      } else {
        throw new RpcException(AppErrors.INTERNAL_SERVER_ERROR);
      }
    }

  }
}
