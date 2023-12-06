import { Injectable } from '@nestjs/common';
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
    return this.userGrpcClient.getUserServiceClient().findAllUser({}).toPromise();
  }

  async findOneUser(findOneUserDto: FindOneUserDto): Promise<User2 | null> {
    return this.userGrpcClient.getUserServiceClient().findOneUser(findOneUserDto).toPromise();
  }

  async createUser(userData: CreateUserDto): Promise<User2> {
    return this.userGrpcClient.getUserServiceClient().createUser(userData).toPromise();
  }

  async updateUser(updatedData: UpdateUserDto): Promise<User2 | null> {
    return this.userGrpcClient.getUserServiceClient().updateUser(updatedData).toPromise();
  }

  async removeUser(findOneUserDto: FindOneUserDto): Promise<User2 | null> {
    return this.userGrpcClient.getUserServiceClient().removeUser(findOneUserDto).toPromise();
  }
}
