// user-grpc-client.ts
import { Client, ClientGrpc } from '@nestjs/microservices';
import { Injectable } from '@nestjs/common';
import { grpcClientOptions } from './grpc-client.options'; // Import your gRPC client options
import { TASK_SERVICE } from '../constants';

@Injectable()
export class TaskGrpcClient {
  @Client(grpcClientOptions) // Provide your gRPC client options
  private readonly client: ClientGrpc;

  public getUserServiceClient(): any {
    return this.client.getService('TaskService');
  }
}
