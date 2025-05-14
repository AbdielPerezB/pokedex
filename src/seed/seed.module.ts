import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    HttpModule.register({
      timeout:5000,
      maxRedirects:5
    })
  ]
})
export class SeedModule {}
