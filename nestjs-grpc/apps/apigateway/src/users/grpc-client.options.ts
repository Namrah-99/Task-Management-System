import { Transport, ClientOptions } from '@nestjs/microservices';
import { join } from 'path';
import { USER_PACKAGE_NAME } from '@app/common/types/user';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: '127.0.0.1:3003', 
    package: 'user',
    protoPath: join(__dirname, '../user.proto'), 
  },
};