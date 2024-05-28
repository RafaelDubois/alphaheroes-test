import {
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  ValidationPipe,
  UnprocessableEntityException,
} from '@nestjs/common';

@Injectable()
export class ValidateInputPipe extends ValidationPipe {
  public async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    try {
      return await super.transform(value, metadata);
    } catch (e) {
      if (e instanceof BadRequestException) {
        throw new UnprocessableEntityException(this.handleError(e));
      }
    }
  }

  private handleError(errors) {
    // Check if errors is an array
    if (Array.isArray(errors)) {
      // If errors is an array, map over it and return the constraints of each error
      return errors.map((error) => error.constraints);
    } else {
      // If errors is not an array, return it as is
      return errors;
    }
  }
}
