import { Transport, ClientOptions } from '@nestjs/microservices';
import { join } from 'path';
import {  AUTH_PACKAGE_NAME } from '@app/common/types/auth';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: '127.0.0.1:3001', 
    package: AUTH_PACKAGE_NAME,
    protoPath: join(__dirname, '../auth.proto'), 
  },
};