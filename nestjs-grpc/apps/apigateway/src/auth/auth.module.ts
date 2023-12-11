import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthService as AuthServiceGrpcClient } from 'apps/auth/src/auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_PACKAGE_NAME } from '@app/common/types/auth';
import { join } from 'path';
import { AuthGrpcClient } from './auth-grpc-client';
import { JwtStrategy } from 'apps/auth/src/strategy/jwt-strategy';
import { AuthModel, AuthSchema } from '@app/common/schemas/auth.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoModule } from '@app/common/modules/mongo.module';
import { UserService } from 'apps/user/src/user.service';
import { UserModel, UserSchema } from '@app/common/schemas/user.schema';

@Module({
  imports: [
    MongoModule,
    MongooseModule.forFeature([{ name: AuthModel.name, schema: AuthSchema }]),
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
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
  providers: [AuthService, UserService, AuthGrpcClient, AuthServiceGrpcClient, JwtStrategy]
})
export class AuthModule { }