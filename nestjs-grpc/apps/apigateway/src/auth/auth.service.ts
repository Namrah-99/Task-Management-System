import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {AuthServiceClient, AuthServiceController, AuthServiceControllerMethods, LoginUserDto, RegisterUserDto, AUTH_SERVICE_NAME} from '@app/common/types/auth'
import { ClientGrpc } from '@nestjs/microservices';
import { AUTH_SERVICE } from '../constants';

@Injectable()
export class AuthService implements OnModuleInit {
  private authService: AuthServiceClient;

  constructor(@Inject(AUTH_SERVICE) private client: ClientGrpc) { }

  onModuleInit() {
    this.authService =
      this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }
  register(registerUserDto: RegisterUserDto) {
    return this.authService.registerUser(registerUserDto);
  }

  login(loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }

}
