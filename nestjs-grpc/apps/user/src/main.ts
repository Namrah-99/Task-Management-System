import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { USER_PACKAGE_NAME } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserModule,
      {
        transport: Transport.GRPC,
        options: {
          url: '127.0.0.1:3003',
          protoPath: join(__dirname,'../user.proto'),
          package: USER_PACKAGE_NAME
        }
      },
    );
    await app.listen();
}
bootstrap();
