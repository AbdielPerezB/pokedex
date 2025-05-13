import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { PokermonService } from './pokemon.service';
import { CreatePokermonDto } from './dto/create-pokermon.dto';
import { UpdatePokermonDto } from './dto/update-pokermon.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';

@Controller('pokemon')
export class PokermonController {
  constructor(private readonly pokermonService: PokermonService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED) //Para personalizar los códigos de respuesta
  create(@Body() createPokermonDto: CreatePokermonDto) {
    return this.pokermonService.create(createPokermonDto);
  }

  @Get()
  findAll() {
    return this.pokermonService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.pokermonService.findOne(term);
  }

  @Patch(':term')
  update(@Param('term') term: string, @Body() updatePokermonDto: UpdatePokermonDto) {
    return this.pokermonService.update(term, updatePokermonDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.pokermonService.remove(id);
  }
}
