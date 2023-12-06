import { Transport, ClientOptions } from '@nestjs/microservices';
import { join } from 'path';
import { TASK_PACKAGE_NAME } from '@app/common/types/task';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: '127.0.0.1:3002', 
    package: TASK_PACKAGE_NAME,
    protoPath: join(__dirname, '../task.proto'), 
  },
};