import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from '@app/common/entities/auth.entity';
import { MongoModule } from '@app/common/modules/mongo.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModel, AuthSchema } from '@app/common/schemas/auth.schema';
import { JwtModule } from '@nestjs/jwt';
import { UserModel, UserSchema } from '@app/common/schemas/user.schema';
import { UserService } from 'apps/user/src/user.service';

@Module({
  imports: [MongoModule,
      MongooseModule.forFeature([{ name: AuthModel.name, schema: AuthSchema }]),
      MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
      JwtModule.register({
        secret: 'abc123',
        signOptions: { expiresIn: '1h' },
      }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService],
  exports: [AuthService]
})
export class AuthModule {}
