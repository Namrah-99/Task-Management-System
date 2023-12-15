import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterRequest, RegisterResponse, LoginRequest, LoginResponse } from '@app/common/types/auth';
import { AuthModel } from '@app/common/schemas/auth.schema';
import * as jwt from 'jsonwebtoken';
import { UserService } from 'apps/user/src/user.service';

@Injectable()
export class AuthService {
  private readonly JWT_SECRET = 'apple-banana-carrot';

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
      // User with the email already exists, return an error response
      throw new Error('User with this email already exists');
    }
  
    // If the user does not exist, proceed with user registration
    const createdUser = await this.userService.createUser({
      email,
      password,
      role: 'student'
    });
  
    // Use the created user's _id to save auth details
    const newAuth = new this.authModel({ _id: createdUser._id, email, password });
    const user = await newAuth.save();
  
    return { message: 'User registered successfully', userId: user._id };
  }
  

  async login(data: LoginRequest): Promise<LoginResponse> {
    const { email, password } = data;
    const user = await this.authModel.findOne({ email, password }).exec();
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const token = this.generateToken(user);
    return { accessToken: token };
  }

  generateToken(user: AuthModel): string {
    const payload = { username: user.email, sub: user._id };
    return jwt.sign(payload, this.JWT_SECRET, { expiresIn: '1h' });
  }

  validateToken(token: string): any {
    try {
      return jwt.verify(token, this.JWT_SECRET);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  async validateUser(payload: any): Promise<AuthModel | null> {
    // Find the user based on the payload extracted from the JWT token
    const { sub: userId } = payload;
    return await this.authModel.findById(userId).exec();
  }
}
