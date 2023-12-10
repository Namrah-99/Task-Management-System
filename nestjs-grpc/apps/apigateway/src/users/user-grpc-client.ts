import { Client, ClientGrpc } from '@nestjs/microservices';
import { Injectable } from '@nestjs/common';
import { grpcClientOptions } from './grpc-client.options';
import { USER_SERVICE_NAME } from '@app/common';

@Injectable()
export class UserGrpcClient {
  @Client(grpcClientOptions)
  private readonly client: ClientGrpc;

  public getUserServiceClient(): any {
    return this.client.getService(USER_SERVICE_NAME);
  }
}
