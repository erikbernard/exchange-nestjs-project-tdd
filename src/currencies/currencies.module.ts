import { Module } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Currencies } from './currencies.entity';
import { CurrenciesRepository } from './currencies.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Currencies])],
  exports: [CurrenciesService],
  providers: [CurrenciesService, CurrenciesRepository],
})
export class CurrenciesModule {}
