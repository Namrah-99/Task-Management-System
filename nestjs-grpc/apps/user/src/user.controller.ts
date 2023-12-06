import { Controller, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserModel } from '@app/common/schemas/user.schema';
import { CreateUserDto, FindOneUserDto, UpdateUserDto, EmptyUser, Users  } from '@app/common/types/user';
import { GrpcMethod } from '@nestjs/microservices';
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UserService', 'createUser')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserModel> {
    return await this.userService.createUser(createUserDto);
  }

  @GrpcMethod('UserService', 'findAllUser')
  async findAllUser(@Body() emptyRequest: EmptyUser): Promise<Users> {
    return await this.userService.findAllUser();
  }
  
  @GrpcMethod('UserService', 'findOneUser')
  async findOneUser(@Body() findOneUserDto: FindOneUserDto): Promise<UserModel | null> {
    return await this.userService.findOneUser(findOneUserDto);
  }

  @GrpcMethod('UserService', 'updateUser')
  async updateUser(@Body() updateUserDto: UpdateUserDto): Promise<UserModel | null> {
    return await this.userService.updateUser(updateUserDto);
  }

  @GrpcMethod('UserService', 'removeUser')
  async removeUser(@Body() findOneUserDto: FindOneUserDto): Promise<UserModel | null> {
    return await this.userService.removeUser(findOneUserDto);
  }
}
