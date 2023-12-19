import { Injectable } from '@nestjs/common';
import { RegisterRequest, RegisterResponse, LoginRequest, LoginResponse, LogoutResponse, LogoutRequest } from '@app/common/types/auth';
import { Client, ClientGrpc, RpcException } from '@nestjs/microservices';
import { grpcClientOptions } from './grpc-client.options';
import { AuthGrpcClient } from './auth-grpc-client';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private readonly authGrpcClient: AuthGrpcClient) { }

  async register(data: RegisterRequest): Promise<RegisterResponse> {
    try {
      return this.authGrpcClient.getUserServiceClient().Register(data).toPromise();
    } catch (error) {
      if (error instanceof RpcException) {
        throw error; // Rethrow gRPC compatible error
      } else {
        throw new RpcException('Internal server error');
      }
    }
  }

  async login(data: LoginRequest): Promise<LoginResponse> {
    try {
      return this.authGrpcClient.getUserServiceClient().Login(data).toPromise();
    } catch (error) {
      if (error instanceof RpcException) {
        throw error; // Rethrow gRPC compatible error
      } else {
        throw new RpcException('Internal server error');
      }
    }
  }

  logout(userId: string): Observable<LogoutResponse> {
    const request: LogoutRequest = { userId };

    try {
      return this.authGrpcClient.getUserServiceClient().Logout(request).toPromise();
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      } else {
        throw new RpcException('Internal server error');
      }
    }
  }
}
