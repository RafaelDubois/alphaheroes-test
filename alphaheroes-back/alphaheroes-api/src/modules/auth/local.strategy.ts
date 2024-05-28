import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

// The LocalStrategy class extends PassportStrategy, which is a part of the @nestjs/passport module.
// It implements a strategy for local authentication (username and password).
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  // The AuthService is injected through the constructor.
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  // The validate method is a required method for a Passport strategy.
  // It's called after Passport has extracted the credentials from the request.
  // It's used to validate these credentials and return the user information.
  async validate(email: string, password: string): Promise<any> {
    // Call the validateUser method of AuthService to validate the credentials.
    const user = await this.authService.validateUser(email, password);

    // If the user is null, the credentials are invalid. Throw an UnauthorizedException.
    if (!user) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    // If the user is not null, the credentials are valid. Return the user object.
    return user;
  }
}
