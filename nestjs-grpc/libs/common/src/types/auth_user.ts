/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "combined";

export interface RegisterRequest {
  username: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  userId: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export interface UserPaginationDto {
  page: number;
  skip: number;
}

export interface UpdateUserDto {
  id: string;
  age: number;
  phoneNumber: string;
  role: string;
  socialMedia: SocialMedia2 | undefined;
}

export interface FindOneUserDto {
  id: string;
}

export interface EmptyUser {
}

export interface Users {
  users: User2[];
}

export interface CreateUserDto {
  username: string;
  password: string;
  age?: number | undefined;
  email: string;
  phoneNumber: string;
  role: string;
}

export interface User2 {
  id: string;
  username: string;
  password: string;
  age: number;
  subscribed: boolean;
  socialMedia?: SocialMedia2 | undefined;
  email: string;
  phoneNumber: string;
  role: string;
}

export interface SocialMedia2 {
  twitterUri?: string | undefined;
  fbUri?: string | undefined;
}

export const COMBINED_PACKAGE_NAME = "combined";

export interface AuthServiceClient {
  register(request: RegisterRequest): Observable<RegisterResponse>;

  /** Additional auth-related methods specific to AuthService can be added here */

  login(request: LoginRequest): Observable<LoginResponse>;
}

export interface AuthServiceController {
  register(request: RegisterRequest): Promise<RegisterResponse> | Observable<RegisterResponse> | RegisterResponse;

  /** Additional auth-related methods specific to AuthService can be added here */

  login(request: LoginRequest): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["register", "login"];
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

export interface UserServiceClient {
  createUser(request: CreateUserDto): Observable<User2>;

  findAllUser(request: EmptyUser): Observable<Users>;

  findOneUser(request: FindOneUserDto): Observable<User2>;

  updateUser(request: UpdateUserDto): Observable<User2>;

  /** Additional user-related methods specific to UserService can be added here */

  removeUser(request: FindOneUserDto): Observable<User2>;
}

export interface UserServiceController {
  createUser(request: CreateUserDto): Promise<User2> | Observable<User2> | User2;

  findAllUser(request: EmptyUser): Promise<Users> | Observable<Users> | Users;

  findOneUser(request: FindOneUserDto): Promise<User2> | Observable<User2> | User2;

  updateUser(request: UpdateUserDto): Promise<User2> | Observable<User2> | User2;

  /** Additional user-related methods specific to UserService can be added here */

  removeUser(request: FindOneUserDto): Promise<User2> | Observable<User2> | User2;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createUser", "findAllUser", "findOneUser", "updateUser", "removeUser"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_SERVICE_NAME = "UserService";
