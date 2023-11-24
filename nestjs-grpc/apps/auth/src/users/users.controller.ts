import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import {UserServiceController, CreateUserDto, UpdateUserDto, UserServiceControllerMethods, FindOneUserDto, PaginationDto} from '@app/common'
import { Observable } from 'rxjs';

@Controller()
@UserServiceControllerMethods()
export class UsersController implements UserServiceController {
  constructor(private readonly usersService: UsersService) {}

  createUser(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  findAllUser() {
    return this.usersService.findAll();
  }

  findOneUser(findOneUserDto: FindOneUserDto) {
    return this.usersService.findOne(findOneUserDto.id);
  }

  updateUser(updateUserDto: UpdateUserDto) {
    // console.log("UPDATED USER DATA (Auth): ",updateUserDto);
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  removeUser(findOneUserDto: FindOneUserDto) {
    return this.usersService.remove(findOneUserDto.id);
  }
  queryUsers(paginationDtoStream: Observable<PaginationDto>) {
    return this.usersService.queryUsers(paginationDtoStream)
  }
}
