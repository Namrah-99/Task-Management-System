import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: any, res: any, next: () => void) {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];

      try {
        const decoded = this.jwtService.verify(token);
        req.user = decoded; // Attach user information to the request object
      } catch (error) {
        // Handle token verification errors
      }
    }

    next();
  }
}