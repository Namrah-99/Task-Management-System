import { Injectable } from '@nestjs/common';
import { RegisterRequest, RegisterResponse, LoginRequest, LoginResponse } from '@app/common/types/auth';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { grpcClientOptions } from './grpc-client.options';
import { AuthGrpcClient } from './auth-grpc-client';

@Injectable()
export class AuthService {
  constructor(private readonly authGrpcClient: AuthGrpcClient) { }

  async register(data: RegisterRequest): Promise<RegisterResponse> {
    // return this.authGrpcClient.getUserServiceClient().Register(data).toPromise();
    try {
      return this.authGrpcClient.getUserServiceClient().Register(data).toPromise();
    } catch (error) {
      // Ensure error details are set
     throw error;
    }
  }

  async login(data: LoginRequest): Promise<LoginResponse> {
    return this.authGrpcClient.getUserServiceClient().Login(data).toPromise();
  }
}
