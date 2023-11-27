import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USER_SERVICE } from '../constants';
import { USER_PACKAGE_NAME } from '@app/common';
import { join } from 'path';

@Module({
  imports:[
    ClientsModule.register([{
      name: USER_SERVICE,
      transport: Transport.GRPC,
      options: {
        package: USER_PACKAGE_NAME,
        protoPath: join(__dirname, '../user.proto'),
        url: '127.0.0.1:3003',
      },
    }])
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
