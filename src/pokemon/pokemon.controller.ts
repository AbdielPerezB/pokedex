import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { PokermonService } from './pokemon.service';
import { CreatePokermonDto } from './dto/create-pokermon.dto';
import { UpdatePokermonDto } from './dto/update-pokermon.dto';

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pokermonService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePokermonDto: UpdatePokermonDto) {
    return this.pokermonService.update(+id, updatePokermonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pokermonService.remove(+id);
  }
}
