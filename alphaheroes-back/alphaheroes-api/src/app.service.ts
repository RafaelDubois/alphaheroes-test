import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return "Bienvenue sur l'api alphaheroes !";
  }
}
