import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UsersService } from '../users/users.service';

@Injectable()
// This class extends PassportStrategy, which is a part of the @nestjs/passport module.
// It implements a strategy for JWT authentication.
export class JwtStrategy extends PassportStrategy(Strategy) {
  // The UsersService is injected through the constructor.
  constructor(private readonly userService: UsersService) {
    super({
      // This tells the strategy to extract the JWT from the Authorization header.
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // This tells the strategy to not ignore expired tokens.
      ignoreExpiration: false,
      // This is the secret key used to sign the tokens.
      secretOrKey: process.env.JWTKEY,
    });
  }

  // This method is called after the JWT has been verified.
  // It can be used to perform additional checks, and to make the payload available to the request handling pipeline.
  async validate(payload: any) {
    // Check if the user specified in the token's payload actually exists.
    const user = await this.userService.findOneById(payload.id);
    if (!user) {
      // If the user doesn't exist, throw an UnauthorizedException.
      throw new UnauthorizedException(
        "Vous n'êtes pas autorisé à accéder à cette ressource. Veuillez vous connecter.",
      );
    }
    // If the user exists, return the payload. This will be added to the request object as req.user.
    return payload;
  }
}
