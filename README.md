
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
Set up NestJS project (nest new project-name).
Create controllers, services, and DTOs for Task, User, and Auth.
Implement CRUD operations for Task and User services.
Add authentication middleware using JWT.
Implement user registration, login, and token generation in the Auth service.

*Frontend (Angular):*
Set up an Angular project (ng new project-name).
Create components for Task Management, User Profile, and Authentication.
Use Angular services to communicate with the corresponding NestJS microservices.
Implement forms for creating/updating tasks and updating user profiles.
Handle user authentication using JWT.

*Communication Between Microservices:*
Use HTTP requests or gRPC for communication between the frontend and backend microservices.
Implement error handling and data validation on both sides.



## API Documentation

[API Documentation](https://documenter.getpostman.com/view/29212903/2s9YeEbrwL)

