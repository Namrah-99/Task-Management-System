import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { User, RegisterUserDto, LoginUserDto } from '@app/common/types/auth'
import { randomUUID } from 'crypto';

@Injectable()
export class AuthService implements OnModuleInit {
  private readonly users: User[] = [];
  private readonly usersCount: number = 0;

  onModuleInit() {
    // for (let i = 0; i <= 100; i++) {
    //   this.create({ username: randomUUID(), password: randomUUID(), age: 0, email: "abcdef@abcd.com", phoneNumber: "+923456789234", role: "Student" });
    // }
    console.log("Register a user")
  }

  register(registerUserDto: RegisterUserDto) {
    return {
      username: "namrah23",
      password: "pass1234",
      age: 23,
      email: "namrah@namrah.com",
      phoneNumber: "+923456789876",
      role: "Student",
      subscribed: false,
      socialMedia: {},
      id: randomUUID(),
    };
  }

  login(loginUserDto: LoginUserDto) {
    return {
      username: "namrah99",
      password: "pass4567",
      age: 50,
      email: "namrah99@namrah.com",
      phoneNumber: "+923226789876",
      role: "Student",
      subscribed: false,
      socialMedia: {},
      id: randomUUID(),
    };
  }
}
