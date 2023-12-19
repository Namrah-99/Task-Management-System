import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterRequest, RegisterResponse, LoginRequest, LoginResponse, LogoutResponse } from '@app/common/types/auth';
import { AuthModel } from '@app/common/schemas/auth.schema';
import * as jwt from 'jsonwebtoken';
import { UserService } from 'apps/user/src/user.service';
import { RpcException } from '@nestjs/microservices';
import { AppErrors } from '@app/common/modules/error.constants';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  private readonly JWT_SECRET = 'apple-banana-carrot';
  private readonly SALT_ROUNDS = 10; // Number of salt rounds for bcrypt

  constructor(@InjectModel(AuthModel.name) private readonly authModel: Model<AuthModel>, private readonly userService: UserService,) {}

  // async register(data: RegisterRequest): Promise<RegisterResponse> {
  //   const { email, password } = data;

  //   // Create user first
  //   const createdUser = await this.userService.createUser({
  //     email,
  //     password,
  //     role: 'student'
  //   });

  //   // Use the created user's _id to save auth details
  //   const newAuth = new this.authModel({ _id: createdUser._id, email, password });
  //   const user = await newAuth.save();

  //   return { message: 'User registered successfully', userId: user._id };
  // }
  
  async register(data: RegisterRequest): Promise<RegisterResponse> {
    const { email, password } = data;

    // Check if the user with the given email already exists
    const existingUser = await this.userService.findUserByEmail(email);

    if (existingUser) {
      throw new RpcException(AppErrors.USER_ALREADY_EXISTS);
    }

    // If the user does not exist, proceed with user registration
    const hashedPassword = await bcrypt.hash(password, this.SALT_ROUNDS);

    const createdUser = await this.userService.createUser({
      email,
      password: hashedPassword,
      role: 'student',
    });

    // Use the created user's _id to save auth details
    const newAuth = new this.authModel({ _id: createdUser._id, email, password: hashedPassword });
    const user = await newAuth.save();

    return { message: 'User registered successfully', userId: user._id };
  }
  

  async login(data: LoginRequest): Promise<LoginResponse> {
    const { email, password } = data;
    const user = await this.authModel.findOne({ email }).exec();

    if (!user) {
      throw new RpcException(AppErrors.INVALID_CREDENTIALS);
    }

    // Use bcrypt.compare to compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new RpcException(AppErrors.INVALID_PASSWORD);
    }

    const token = this.generateToken(user);
    return { accessToken: token };
  }

  async logout(userId: string): Promise<LogoutResponse> {
    // Implement your logout logic here, such as invalidating the token on the server side.
    // For simplicity, let's assume the token is always invalidated.
    
    // Additional steps, such as revoking refresh tokens, can be added here.

    return { message: 'Logout successful' };
  }
  

  generateToken(user: AuthModel): string {
    const payload = { username: user.email, sub: user._id };
    return jwt.sign(payload, this.JWT_SECRET, { expiresIn: '1h' });
  }

  validateToken(token: string): any {
    try {
      return jwt.verify(token, this.JWT_SECRET);
    } catch (error) {
      throw new RpcException(AppErrors.INVALID_TOKEN );
    }
  }

  async validateUser(payload: any): Promise<AuthModel | null> {
    // Find the user based on the payload extracted from the JWT token
    const { sub: userId } = payload;
    return await this.authModel.findById(userId).exec();
  }
}
