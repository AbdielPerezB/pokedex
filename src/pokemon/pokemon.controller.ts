import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { PokermonService } from './pokemon.service';
import { CreatePokermonDto } from './dto/create-pokermon.dto';
import { UpdatePokermonDto } from './dto/update-pokermon.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { PaginationDTO } from 'src/common/dto/pagination.dto';

@Controller('pokemon')
export class PokermonController {
  constructor(private readonly pokermonService: PokermonService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED) //Para personalizar los códigos de respuesta
  create(@Body() createPokermonDto: CreatePokermonDto) {
    return this.pokermonService.create(createPokermonDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDTO) {
    // console.log({paginationDto});
    return this.pokermonService.findAll(paginationDto)
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
