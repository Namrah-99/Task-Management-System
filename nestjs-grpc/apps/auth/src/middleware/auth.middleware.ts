import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) { }

  use(req: any, res: any, next: () => void) {
    const authHeader = req.headers.authorization;
    console.log('authHeader:', authHeader);

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];

      try {
        const decoded = this.jwtService.verify(token);
        req.user = decoded; // Attach user information to the request object
      } catch (error) {
        // Log the error
        console.error('Token verification error:', error);

        // Send a 401 Unauthorized response
        res.status(401).json({ statusCode: 401, message: 'Unauthorized' });
        return;
      }
    }

    next();
  }
}
