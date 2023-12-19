import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from '@app/common/schemas/user.schema';
import { CreateUserDto, FindOneUserDto, UpdateUserDto, User2, Users } from '@app/common/types/user';
import { AppErrors } from '@app/common/modules/error.constants';
import { RpcException } from '@nestjs/microservices';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(@InjectModel(UserModel.name) private readonly userModel: Model<UserModel>) {}

  async findUserByEmail(email: string): Promise<UserModel | null> {
    try {
      return await this.userModel.findOne({ email }).exec();
    } catch (error) {
      // Log the error here
      throw new RpcException(AppErrors.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllUser(): Promise<Users> {
    try {
      const users: UserModel[] = await this.userModel.find().exec();
      const transformedUsers: User2[] = users.map((user) => {
        return {
          id: user._id, // Replace with your actual ID property
          username: user.username,
          password: user.password,
          age: user.age,
          subscribed: user.subscribed,
          socialMedia: user.socialMedia,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: user.role,
        };
      });
  
      return { users: transformedUsers };
    } catch (error) {
      // Log the error here
      throw new RpcException(AppErrors.INTERNAL_SERVER_ERROR);
    }
  }

  async findOneUser(findOneUserDto: FindOneUserDto): Promise<UserModel | null> {
    try {
      return await this.userModel.findById(findOneUserDto.id).exec();
    } catch (error) {
      // Log the error here
      throw new RpcException(AppErrors.INTERNAL_SERVER_ERROR);
    }
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserModel> {
    try {
      const { username, password, age, email, phoneNumber, role } = createUserDto;

      // Check if the user with the given email already exists
      const existingUser = await this.findUserByEmail(email);

      if (existingUser) {
        throw new RpcException(AppErrors.USER_ALREADY_EXISTS);
      }

      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 10);

      const createdUser = new this.userModel({
        username,
        password: hashedPassword,
        age,
        email,
        phoneNumber,
        role,
        subscribed: false,
      });

      return await createdUser.save();
    } catch (error) {
      // Log the error here
      throw new RpcException(AppErrors.INTERNAL_SERVER_ERROR);
    }
  }

  async updateUser(updateUserDto: UpdateUserDto): Promise<UserModel | null> {
    try {
      return await this.userModel
        .findByIdAndUpdate(updateUserDto.id, { ...updateUserDto }, { new: true })
        .exec();
    } catch (error) {
      // Log the error here
      throw new RpcException(AppErrors.INTERNAL_SERVER_ERROR);
    }
  }

  async removeUser(findOneUserDto: FindOneUserDto): Promise<UserModel | null> {
    try {
      const deletedUser = await this.userModel.findByIdAndDelete(findOneUserDto.id).exec();
      return deletedUser ? new this.userModel(deletedUser).toObject() as UserModel : null;
    } catch (error) {
      // Log the error here
      throw new RpcException(AppErrors.INTERNAL_SERVER_ERROR);
    }
  }
}
