import { NestFactory } from '@nestjs/core';
import { TaskModule } from './task.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { TASK_SERVICE_NAME } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TaskModule,
      {
        transport: Transport.GRPC,
        options: {
          protoPath: join(__dirname,'../auth.proto'),
          package: TASK_SERVICE_NAME
        }
      },
    );
    await app.listen();
}
bootstrap();
