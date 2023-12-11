import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USER_PACKAGE_NAME } from '@app/common';
import { join } from 'path';
import { UserGrpcClient } from './user-grpc-client';
import { JwtAuthGuard } from '@app/common/guards/jwt.auth.guard';

@Module({
  imports: [
    ClientsModule.register([{
      name: USER_PACKAGE_NAME,
      transport: Transport.GRPC,
      options: {
        package: USER_PACKAGE_NAME,
        protoPath: join(__dirname, '../user.proto'),
        url: '127.0.0.1:3003',
      },
    }])
  ],
  controllers: [UsersController],
  providers: [UsersService, UserGrpcClient, JwtAuthGuard]
})
export class UsersModule { }
