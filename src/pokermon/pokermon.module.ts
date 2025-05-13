import { Module } from '@nestjs/common';
import { PokermonService } from './pokermon.service';
import { PokermonController } from './pokermon.controller';

@Module({
  controllers: [PokermonController],
  providers: [PokermonService],
})
export class PokermonModule {}
