import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterUserDto, LoginUserDto, User } from '@app/common/types/auth';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private readonly users: User[] = [];

  register(registerUserDto: RegisterUserDto): User {
    const hashedPassword = bcrypt.hashSync(registerUserDto.password, 10);
    const newUser: User = {
      ...registerUserDto,
      password: hashedPassword,
      id: randomUUID(),
      subscribed: false,
      socialMedia: undefined
    };
    this.users.push(newUser);
    return newUser;
  }

  login(loginUserDto: LoginUserDto): User {
    const user = this.findUserByUsername(loginUserDto.username);
    if (!user || !bcrypt.compareSync(loginUserDto.password, user.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const accessToken = this.generateToken(user);
    // console.log("user  : ",{...user,accessToken});
    return {...user,accessToken};
  }

  private findUserByUsername(username: string): User | undefined {
    return this.users.find((user) => user.username === username);
  }

  private generateToken(user: User): string {
    const payload = { username: user.username, sub: user.id };
    return jwt.sign(payload, 'helloworldabcdefghPotatoSticksPizzaPasta', { expiresIn: '1h' });
  }
}

