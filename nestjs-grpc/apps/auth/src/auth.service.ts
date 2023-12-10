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

  async register(data: RegisterRequest): Promise<RegisterResponse> {
    const { username, password } = data;

    // Create user first
    const createdUser = await this.userService.createUser({
      username,
      password,
      age: 0,
      email: '',
      phoneNumber: '',
      role: '',
    });

    // Use the created user's _id to save auth details
    const newAuth = new this.authModel({ _id: createdUser._id, username, password });
    const user = await newAuth.save();

    return { message: 'User registered successfully', userId: user._id };
  }
  
  async login(data: LoginRequest): Promise<LoginResponse> {
    const { username, password } = data;
    const user = await this.authModel.findOne({ username, password }).exec();
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const token = this.generateToken(user);
    return { accessToken: token };
  }

  generateToken(user: AuthModel): string {
    const payload = { username: user.username, sub: user._id };
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
