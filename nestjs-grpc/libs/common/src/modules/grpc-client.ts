import { Client, ClientGrpc, ClientProxyFactory } from '@nestjs/microservices';
import { Injectable } from '@nestjs/common';
import { createGrpcClientOptions } from './grpc-client.options'; // Import your gRPC client options

@Injectable()
export class GrpcClient {
  private readonly serviceName: string;
  private client?: ClientGrpc;

  constructor(serviceName: string) {
    this.serviceName = serviceName;
  }

  async init(options: any) {
    this.client = ClientProxyFactory.create(options);
  }

  getServiceClient(): any {
    if (!this.client) {
      throw new Error('gRPC client is not initialized');
    }
    return this.client;
  }
}
