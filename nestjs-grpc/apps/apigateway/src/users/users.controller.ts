import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, FindOneUserDto, UpdateUserDto } from '@app/common/types/user';
import { JwtAuthGuard } from '@app/common/guards/jwt.auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log("createUserDto ",createUserDto)
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard) // Apply JwtAuthGuard here to protect this route
  findAll() {
    return this.usersService.findAllUser();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard) // Apply JwtAuthGuard here to protect this route
  findOne(@Param('id') id: string) {
    const findOneUserDto: FindOneUserDto={id}
    return this.usersService.findOneUser(findOneUserDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard) // Apply JwtAuthGuard here to protect this route
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        if (!updateUserDto.id) {
          updateUserDto.id = id;
        }
    return this.usersService.updateUser(updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard) // Apply JwtAuthGuard here to protect this route
  remove(@Param('id') id: string) {
    const findOneUserDto: FindOneUserDto={id}
    return this.usersService.removeUser(findOneUserDto);
  }
}