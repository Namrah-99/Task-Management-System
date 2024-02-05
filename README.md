
# Task Management System

Microservices Project

**Backend (NestJS):**
Task Service: Manages tasks, including CRUD operations.
User Service: Manages user information.
Auth Service: Manages user authentication and authorization.

**Frontend (Angular):**
Task Management UI: Allows users to view, create, update, and delete tasks.
User Profile UI: Displays and allows users to update their profile information.
Authentication UI: Handles user login and registration.

**Implementation Steps:**

*Backend (NestJS):*
Sets up NestJS project (nest new project-name).
Creates controllers, services, and DTOs for Task, User, and Auth.
Implementes CRUD operations for Task and User services.
Adds authentication middleware using JWT.
Implements user registration, login, and token generation in the Auth service.

*Frontend (Angular):*
Sets up an Angular project (ng new project-name).
Creats components for Task Management, User Profile, and Authentication.
Uses Angular services to communicate with the corresponding NestJS microservices.
Implements forms for creating/updating tasks and updates user profiles.
Handles user authentication using JWT.

*Communication Between Microservices:*
Uses gRPC for communication between the frontend and backend microservices.
Implements error handling and data validation on both sides.



## API Documentation

[POSTMAN Published API Documentation](https://documenter.getpostman.com/view/29212903/2s9YeEbrwL)

