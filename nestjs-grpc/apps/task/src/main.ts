import { NestFactory } from '@nestjs/core';
import { TaskModule } from './task.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { TASK_PACKAGE_NAME } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TaskModule,
      {
        transport: Transport.GRPC,
        options: {
          url: '127.0.0.1:3002',
          protoPath: join(__dirname,'../task.proto'),
          package: TASK_PACKAGE_NAME
        }
      },
    );
    await app.listen();
}
bootstrap();
