import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_PACKAGE_NAME } from '@app/common/types/auth';
import { join } from 'path';
import { AuthGrpcClient } from './auth-grpc-client';

@Module({
  imports:[
    ClientsModule.register([{
      name: AUTH_PACKAGE_NAME,
      transport: Transport.GRPC,
      options: {
        package: AUTH_PACKAGE_NAME,
        protoPath: join(__dirname, '../auth.proto'),
        url: '127.0.0.1:3001',
      },
    }])
  ],
  controllers: [AuthController],
  providers: [AuthService,AuthGrpcClient]
})
export class AuthModule {}