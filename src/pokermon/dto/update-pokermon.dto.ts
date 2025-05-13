import { PartialType } from '@nestjs/mapped-types';
import { CreatePokermonDto } from './create-pokermon.dto';

//Esto significa que UpdatePokermonDto tendra todas las propiedades de 
//CreatePokermonDto, con la diferencia de que todas serán opcionales
export class UpdatePokermonDto extends PartialType(CreatePokermonDto) {}
