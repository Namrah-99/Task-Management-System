// import { Injectable } from '@nestjs/common';
// import { UserGrpcClient } from './user-grpc-client';
// import {
//   CreateUserDto,
//   UpdateUserDto,
//   FindOneUserDto,
//   User2,
//   Users,
// } from '@app/common/types/user';

// @Injectable()
// export class UsersService {
//   constructor(private readonly userGrpcClient: UserGrpcClient) {}

//   async findAllUser(): Promise<Users> {
//     return this.userGrpcClient.getUserServiceClient().findAllUser({}).toPromise();
//   }

//   async findOneUser(findOneUserDto: FindOneUserDto): Promise<User2 | null> {
//     return this.userGrpcClient.getUserServiceClient().findOneUser(findOneUserDto).toPromise();
//   }

//   async createUser(userData: CreateUserDto): Promise<User2> {
//     return this.userGrpcClient.getUserServiceClient().createUser(userData).toPromise();
//   }

//   async updateUser(updatedData: UpdateUserDto): Promise<User2 | null> {
//     return this.userGrpcClient.getUserServiceClient().updateUser(updatedData).toPromise();
//   }

//   async removeUser(findOneUserDto: FindOneUserDto): Promise<User2 | null> {
//     return this.userGrpcClient.getUserServiceClient().removeUser(findOneUserDto).toPromise();
//   }
// }

import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { UserGrpcClient } from './user-grpc-client';
import {
  CreateUserDto,
  UpdateUserDto,
  FindOneUserDto,
  User2,
  Users,
} from '@app/common/types/user';

@Injectable()
export class UsersService {
  constructor(private readonly userGrpcClient: UserGrpcClient) {}

  async findAllUser(): Promise<Users> {
    try {
      return await this.userGrpcClient.getUserServiceClient().findAllUser({}).toPromise();
    } catch (error) {
      if (error instanceof RpcException) {
        throw error; // Rethrow gRPC compatible error
      } else {
        throw new RpcException('Internal server error');
      }
    }
  }

  async findOneUser(findOneUserDto: FindOneUserDto): Promise<User2 | null> {
    try {
      return await this.userGrpcClient.getUserServiceClient().findOneUser(findOneUserDto).toPromise();
    } catch (error) {
      if (error instanceof RpcException) {
        throw error; // Rethrow gRPC compatible error
      } else {
        throw new RpcException('Internal server error');
      }
    }
  }

  async createUser(userData: CreateUserDto): Promise<User2> {
    try {
      return await this.userGrpcClient.getUserServiceClient().createUser(userData).toPromise();
    } catch (error) {
      if (error instanceof RpcException) {
        throw error; // Rethrow gRPC compatible error
      } else {
        throw new RpcException('Internal server error');
      }
    }
  }

  async updateUser(updatedData: UpdateUserDto): Promise<User2 | null> {
    try {
      return await this.userGrpcClient.getUserServiceClient().updateUser(updatedData).toPromise();
    } catch (error) {
      if (error instanceof RpcException) {
        throw error; // Rethrow gRPC compatible error
      } else {
        throw new RpcException('Internal server error');
      }
    }
  }

  async removeUser(findOneUserDto: FindOneUserDto): Promise<User2 | null> {
    try {
      return await this.userGrpcClient.getUserServiceClient().removeUser(findOneUserDto).toPromise();
    } catch (error) {
      if (error instanceof RpcException) {
        throw error; // Rethrow gRPC compatible error
      } else {
        throw new RpcException('Internal server error');
      }
    }
  }
}

