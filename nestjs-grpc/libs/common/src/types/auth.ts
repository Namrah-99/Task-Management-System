/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "auth";

export interface RegisterUserDto {
  username: string;
  password: string;
  age: number;
  email: string;
  phoneNumber: string;
  role: string;
}

export interface LoginUserDto {
  username: string;
  password: string;
}

export interface User {
  id: string;
  username: string;
  password: string;
  age: number;
  subscribed?: boolean;
  socialMedia?: SocialMedia | undefined;
  email: string;
  phoneNumber: string;
  role: string;
  accessToken?: string | undefined;
}

export interface SocialMedia {
  twitterUri?: string | undefined;
  fbUri?: string | undefined;
}

export const AUTH_PACKAGE_NAME = "auth";

export interface AuthServiceClient {
  registerUser(request: RegisterUserDto): Observable<User>;

  loginUser(request: LoginUserDto): Observable<User>;
}

export interface AuthServiceController {
  registerUser(request: RegisterUserDto): Promise<User> | Observable<User> | User;

  loginUser(request: LoginUserDto): Promise<User> | Observable<User> | User;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["registerUser", "loginUser"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const AUTH_SERVICE_NAME = "AuthService";
