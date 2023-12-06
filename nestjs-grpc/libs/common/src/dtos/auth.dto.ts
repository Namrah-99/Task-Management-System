import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthDTO {
  @ApiProperty({ example: '60abcf9586b349246cd8dbcc', description: 'ID of the authentication' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'example@email.com', description: 'Email used for authentication' })
  @IsString()
  email: string;

  @ApiProperty({ example: 'password123', description: 'Password for authentication' })
  @IsString()
  password: string;

  // @ApiProperty({ example: 'someAccessToken', description: 'Access token for authentication' })
  // @IsOptional()
  // @IsString()
  // accessToken?: string;
}
