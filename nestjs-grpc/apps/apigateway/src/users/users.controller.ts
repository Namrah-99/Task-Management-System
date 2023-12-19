// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Patch,
//   Param,
//   Delete,
//   UseGuards,
// } from '@nestjs/common';
// import { UsersService } from './users.service';
// import { CreateUserDto, FindOneUserDto, UpdateUserDto } from '@app/common/types/user';
// import { JwtAuthGuard } from '@app/common/guards/jwt.auth.guard';

// @Controller('users')
// export class UsersController {
//   constructor(private readonly usersService: UsersService) { }

//   @Post()
//   @UseGuards(JwtAuthGuard) // Apply JwtAuthGuard here to protect this route
//   create(@Body() createUserDto: CreateUserDto) {
//     console.log("createUserDto ", createUserDto);
//     return this.usersService.createUser(createUserDto);
//   }

//   @Get()
//   @UseGuards(JwtAuthGuard) // Apply JwtAuthGuard here to protect this route
//   findAll() {
//     console.log('user controller ')
//     return this.usersService.findAllUser();
//   }

//   @Get(':id')
//   @UseGuards(JwtAuthGuard) // Apply JwtAuthGuard here to protect this route
//   findOne(@Param('id') id: string) {
//     const findOneUserDto: FindOneUserDto = { id }
//     return this.usersService.findOneUser(findOneUserDto);
//   }

//   @Patch(':id')
//   @UseGuards(JwtAuthGuard) // Apply JwtAuthGuard here to protect this route
//   update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
//     if (!updateUserDto.id) {
//       updateUserDto.id = id;
//     }
//     return this.usersService.updateUser(updateUserDto);
//   }

//   @Delete(':id')
//   @UseGuards(JwtAuthGuard) // Apply JwtAuthGuard here to protect this route
//   remove(@Param('id') id: string) {
//     const findOneUserDto: FindOneUserDto = { id }
//     return this.usersService.removeUser(findOneUserDto);
//   }
// }
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, FindOneUserDto, UpdateUserDto } from '@app/common/types/user';
import { JwtAuthGuard } from '@app/common/guards/jwt.auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(JwtAuthGuard) // Apply JwtAuthGuard here to protect this route
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      console.log('createUserDto ', createUserDto);
      return await this.usersService.createUser(createUserDto);
    } catch (error) {
      console.log('Error in createUser (apigateway grpc client):', error.message);

      // Check if the error has a specific message
      if (error?.message.includes('User with this email already exists')) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        // Handle other errors generically
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard) // Apply JwtAuthGuard here to protect this route
  async findAll() {
    try {
      console.log('user controller ');
      return await this.usersService.findAllUser();
    } catch (error) {
      console.log('Error in findAllUser (apigateway grpc client):', error.message);
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard) // Apply JwtAuthGuard here to protect this route
  async findOne(@Param('id') id: string) {
    try {
      const findOneUserDto: FindOneUserDto = { id };
      return await this.usersService.findOneUser(findOneUserDto);
    } catch (error) {
      console.log('Error in findOneUser (apigateway grpc client):', error.message);
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard) // Apply JwtAuthGuard here to protect this route
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      if (!updateUserDto.id) {
        updateUserDto.id = id;
      }
      return await this.usersService.updateUser(updateUserDto);
    } catch (error) {
      console.log('Error in updateUser (apigateway grpc client):', error.message);
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard) // Apply JwtAuthGuard here to protect this route
  async remove(@Param('id') id: string) {
    try {
      const findOneUserDto: FindOneUserDto = { id };
      return await this.usersService.removeUser(findOneUserDto);
    } catch (error) {
      console.log('Error in removeUser (apigateway grpc client):', error.message);
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
