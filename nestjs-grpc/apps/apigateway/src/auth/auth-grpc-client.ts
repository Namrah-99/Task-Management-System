import { Client, ClientGrpc } from '@nestjs/microservices';
import { Injectable } from '@nestjs/common';
import { grpcClientOptions } from './grpc-client.options'; 
import { AUTH_SERVICE_NAME } from '@app/common/types/auth';

@Injectable()
export class AuthGrpcClient {
  @Client(grpcClientOptions)
  private readonly client: ClientGrpc;

  public getUserServiceClient(): any {
    return this.client.getService(AUTH_SERVICE_NAME);
  }
}
