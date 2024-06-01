
# Task Management System

Microservices Project

**Backend (NestJS):**
- Task Service: Manages tasks, including CRUD operations.
- User Service: Manages user information.
- Auth Service: Manages user authentication and authorization.

**Frontend (Angular):**
- Task Management UI: Allows users to view, create, update, and delete tasks.
- User Profile UI: Displays and allows users to update their profile information.
- Authentication UI: Handles user login and registration.

**Implementation Steps:**

*Backend (NestJS):*
- Sets up NestJS project (nest new project-name).
- Creates controllers, services, and DTOs for Task, User, and Auth.
- Implementes CRUD operations for Task and User services.
- Adds authentication middleware using JWT.
- Implements user registration, login, and token generation in the Auth service.

*Frontend (Angular):*
- Sets up an Angular project (ng new project-name).
- Creats components for Task Management, User Profile, and Authentication.
- Uses Angular services to communicate with the corresponding NestJS microservices.
- Implements forms for creating/updating tasks and updates user profiles.
- Handles user authentication using JWT.

*Communication Between Microservices:*
- Uses gRPC for communication between the frontend and backend microservices.
- Implements error handling and data validation on both sides.

## More Details

TaskForge project utilizes a microservices architecture to manage tasks, user information, and authentication. 

Here’s how the microservices communicate and the technologies used:

### Backend Services:

- Task Service: Manages CRUD operations for tasks.
- User Service: Manages user information.
- Auth Service: Manages user authentication and authorization.

### Frontend:

Built with Angular, providing UIs for task management, user profile updates, and authentication.

### Communication Between Microservices:

- Uses gRPC (Google Remote Procedure Call) for efficient communication between services.
- Implements Protobuf (Protocol Buffers) for data serialization, ensuring fast and reliable message exchange.

### Implementation Steps:

- NestJS for Backend: Each service is implemented with controllers, services, and DTOs (Data Transfer Objects). JWT is used for authentication.
- Angular for Frontend: Angular services communicate with the backend microservices. Forms handle user interactions for tasks and profiles.

### Project Workflow:

- User Authentication: Handled by the Auth Service using JWT tokens.
- Task Management: Task Service provides endpoints for task-related operations.
- User Profiles: User Service allows updating and retrieving user information.
- Inter-service Communication: gRPC ensures services can communicate efficiently, and Protobuf handles message formats.


## API Documentation

[POSTMAN Published API Documentation](https://documenter.getpostman.com/view/29212903/2s9YeEbrwL)

