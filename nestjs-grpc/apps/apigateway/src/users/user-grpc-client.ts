// user-grpc-client.ts
import { Client, ClientGrpc } from '@nestjs/microservices';
import { Injectable } from '@nestjs/common';
import { grpcClientOptions } from './grpc-client.options'; // Import your gRPC client options

@Injectable()
export class UserGrpcClient {
  @Client(grpcClientOptions) // Provide your gRPC client options
  private readonly client: ClientGrpc;

  public getUserServiceClient(): any {
    return this.client.getService('UserService');
  }
}
