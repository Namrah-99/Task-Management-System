import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from '@app/common/schemas/user.schema';
import { CreateUserDto, FindOneUserDto, UpdateUserDto, User2, Users  } from '@app/common/types/user';

@Injectable()
export class UserService {
  constructor(@InjectModel(UserModel.name) private readonly userModel: Model<UserModel>) {}

  async findAllUser(): Promise<Users> {
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
  }

  async findOneUser(findOneUserDto: FindOneUserDto): Promise<UserModel | null> {
    console.log("findOneUserDto.id  ",findOneUserDto.id)
    const user = await this.userModel.findById(findOneUserDto.id).exec();
    if (!user) {
      return null;
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserModel> {
    // const createdUser = new this.userModel(createUserDto);
    const { username, password, age, email, phoneNumber, role } = createUserDto;
    const createdUser = new this.userModel({
      username,
      password,
      age,
      email,
      phoneNumber,
      role,
      subscribed: false,
    });

    console.log("createdUser  ",createdUser)
    return await createdUser.save();
  }

  async updateUser(updateUserDto: UpdateUserDto): Promise<UserModel | null> {
    return await this.userModel.findByIdAndUpdate(
      updateUserDto.id,
      { ...updateUserDto },
      { new: true }
    ).exec();
  }

  async removeUser(findOneUserDto: FindOneUserDto): Promise<UserModel | null> {
    const deletedUser = await this.userModel.findByIdAndDelete(findOneUserDto.id).exec();
    return deletedUser ? new this.userModel(deletedUser).toObject() as UserModel : null;
  }

  
}