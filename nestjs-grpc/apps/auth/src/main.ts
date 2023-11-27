import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AUTH_PACKAGE_NAME } from '@app/common/types/auth';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
      {
        transport: Transport.GRPC,
        options: {
          url: '127.0.0.1:3001',
          protoPath: join(__dirname,'../auth.proto'),
          package: AUTH_PACKAGE_NAME
        }
      },
    );
    await app.listen();
}
bootstrap();
