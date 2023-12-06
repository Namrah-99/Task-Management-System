import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, FindOneUserDto, UpdateUserDto } from '@app/common/types/user';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log("createUserDto ",createUserDto)
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAllUser();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const findOneUserDto: FindOneUserDto={id}
    return this.usersService.findOneUser(findOneUserDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        if (!updateUserDto.id) {
          updateUserDto.id = id;
        }
    return this.usersService.updateUser(updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const findOneUserDto: FindOneUserDto={id}
    return this.usersService.removeUser(findOneUserDto);
  }
}