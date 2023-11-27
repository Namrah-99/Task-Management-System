import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import {AuthServiceController, AuthServiceControllerMethods, LoginUserDto, RegisterUserDto, User} from '@app/common/types/auth'

@Controller()
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  constructor(private readonly authService: AuthService) {}

  registerUser(registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  loginUser(loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

}
