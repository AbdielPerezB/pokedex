import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    
    //el método para comprobar si es un id de MOngo ya lo tenemos provisto:
    if(!isValidObjectId(value))
      throw new BadRequestException(`${value} is not a valid Mongo id`);
    return value;
  }
}
