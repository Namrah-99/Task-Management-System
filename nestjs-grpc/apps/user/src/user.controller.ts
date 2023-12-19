// import { Controller, Body } from '@nestjs/common';
// import { UserService } from './user.service';
// import { UserModel } from '@app/common/schemas/user.schema';
// import { CreateUserDto, FindOneUserDto, UpdateUserDto, EmptyUser, Users  } from '@app/common/types/user';
// import { GrpcMethod } from '@nestjs/microservices';
// @Controller('users')
// export class UserController {
//   constructor(private readonly userService: UserService) {}

//   @GrpcMethod('UserService', 'createUser')
//   async createUser(@Body() createUserDto: CreateUserDto): Promise<UserModel> {
//     return await this.userService.createUser(createUserDto);
//   }

//   @GrpcMethod('UserService', 'findAllUser')
//   async findAllUser(@Body() emptyRequest: EmptyUser): Promise<Users> {
//     return await this.userService.findAllUser();
//   }
  
//   @GrpcMethod('UserService', 'findOneUser')
//   async findOneUser(@Body() findOneUserDto: FindOneUserDto): Promise<UserModel | null> {
//     return await this.userService.findOneUser(findOneUserDto);
//   }

//   @GrpcMethod('UserService', 'updateUser')
//   async updateUser(@Body() updateUserDto: UpdateUserDto): Promise<UserModel | null> {
//     return await this.userService.updateUser(updateUserDto);
//   }

//   @GrpcMethod('UserService', 'removeUser')
//   async removeUser(@Body() findOneUserDto: FindOneUserDto): Promise<UserModel | null> {
//     return await this.userService.removeUser(findOneUserDto);
//   }
// }

import { Controller, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserModel } from '@app/common/schemas/user.schema';
import { CreateUserDto, FindOneUserDto, UpdateUserDto, EmptyUser, Users } from '@app/common/types/user';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { AppErrors } from '@app/common/modules/error.constants';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UserService', 'createUser')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserModel> {
    try {
      return await this.userService.createUser(createUserDto);
    } catch (error) {
      console.log('Error in createUser:', error.message);
      if (error instanceof RpcException) {
        throw error; // Rethrow gRPC compatible error
      } else {
        throw new RpcException(AppErrors.INTERNAL_SERVER_ERROR);
      }
    }
  }

  @GrpcMethod('UserService', 'findAllUser')
  async findAllUser(@Body() emptyRequest: EmptyUser): Promise<Users> {
    try {
      return await this.userService.findAllUser();
    } catch (error) {
      console.log('Error in findAllUser:', error.message);
      throw new RpcException(AppErrors.INTERNAL_SERVER_ERROR);
    }
  }
  
  @GrpcMethod('UserService', 'findOneUser')
  async findOneUser(@Body() findOneUserDto: FindOneUserDto): Promise<UserModel | null> {
    try {
      return await this.userService.findOneUser(findOneUserDto);
    } catch (error) {
      console.log('Error in findOneUser:', error.message);
      throw new RpcException(AppErrors.INTERNAL_SERVER_ERROR);
    }
  }

  @GrpcMethod('UserService', 'updateUser')
  async updateUser(@Body() updateUserDto: UpdateUserDto): Promise<UserModel | null> {
    try {
      return await this.userService.updateUser(updateUserDto);
    } catch (error) {
      console.log('Error in updateUser:', error.message);
      if (error instanceof RpcException) {
        throw error; // Rethrow gRPC compatible error
      } else {
        throw new RpcException(AppErrors.INTERNAL_SERVER_ERROR);
      }
    }
  }

  @GrpcMethod('UserService', 'removeUser')
  async removeUser(@Body() findOneUserDto: FindOneUserDto): Promise<UserModel | null> {
    try {
      return await this.userService.removeUser(findOneUserDto);
    } catch (error) {
      console.log('Error in removeUser:', error.message);
      if (error instanceof RpcException) {
        throw error; // Rethrow gRPC compatible error
      } else {
        throw new RpcException(AppErrors.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
