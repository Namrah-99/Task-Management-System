import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsBoolean, IsOptional } from 'class-validator';

export class UserDTO {
  @ApiProperty({ example: '60abcf9586b349246cd8dbcc', description: 'ID of the user' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'john_doe', description: 'Username of the user' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'password123', description: 'Password of the user' })
  @IsString()
  password: string;

  @ApiProperty({ example: 25, description: 'Age of the user' })
  @IsNumber()
  age: number;

  @ApiProperty({ example: true, description: 'Subscribed status of the user' })
  @IsOptional()
  @IsBoolean()
  subscribed?: boolean;

  @ApiProperty({ example: 'https://twitter.com/johndoe', description: 'Twitter URI of the user' })
  @IsOptional()
  @IsString()
  twitterUri?: string;

  @ApiProperty({ example: 'https://facebook.com/johndoe', description: 'Facebook URI of the user' })
  @IsOptional()
  @IsString()
  fbUri?: string;

  @ApiProperty({ example: 'john@example.com', description: 'Email of the user' })
  @IsString()
  email: string;

  @ApiProperty({ example: '1234567890', description: 'Phone number of the user' })
  @IsString()
  phoneNumber: string;

  @ApiProperty({ example: 'admin', description: 'Role of the user' })
  @IsString()
  role: string;
}
