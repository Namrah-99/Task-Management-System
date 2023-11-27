import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import {UserServiceController, CreateUserDto, UpdateUserDto, UserServiceControllerMethods, FindOneUserDto, UserPaginationDto} from '@app/common/types/user'
import { Observable } from 'rxjs';

@Controller()
@UserServiceControllerMethods()
export class UsersController implements UserServiceController {
  constructor(private readonly usersService: UserService) {}

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
  queryUsers(paginationDtoStream: Observable<UserPaginationDto>) {
    return this.usersService.queryUsers(paginationDtoStream)
  }
}
