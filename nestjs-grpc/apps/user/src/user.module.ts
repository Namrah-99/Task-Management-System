import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from '@app/common/schemas/user.schema';
import { MongoModule } from '@app/common/modules/mongo.module';
import { AuthModel, AuthSchema } from '@app/common/schemas/auth.schema';
import { AuthService } from 'apps/auth/src/auth.service';

@Module({
  imports: [MongoModule,
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: AuthModel.name, schema: AuthSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService,  AuthService],
  exports: [UserService],
})
export class UserModule { }
