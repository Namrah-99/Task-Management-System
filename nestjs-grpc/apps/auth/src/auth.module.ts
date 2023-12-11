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
import { JwtStrategy } from './strategy/jwt-strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [MongoModule,
      MongooseModule.forFeature([{ name: AuthModel.name, schema: AuthSchema }]),
      MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
      PassportModule.register({ defaultStrategy: 'jwt' }), // Register the default JWT strategy
      JwtModule.register({
        secret: 'apple-banana-carrot',
        signOptions: { expiresIn: '1h' },
      }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
