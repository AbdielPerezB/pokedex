import { Injectable } from '@nestjs/common';
import { CreatePokermonDto } from './dto/create-pokermon.dto';
import { UpdatePokermonDto } from './dto/update-pokermon.dto';

@Injectable()
export class PokermonService {
  create(createPokermonDto: CreatePokermonDto) {
    return {message:'This action adds a new pokermon'};
  }

  findAll() {
    return {message:'This action adds a new pokermon'};
  }

  findOne(id: number) {
    return `This action returns a #${id} pokermon`;
  }

  update(id: number, updatePokermonDto: UpdatePokermonDto) {
    return `This action updates a #${id} pokermon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokermon`;
  }
}
