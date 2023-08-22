import { Module } from '@nestjs/common';
import { ExchangeService } from './exchange.service';
import { CurrenciesService } from 'src/currencies/currencies.service';

@Module({
  providers: [ExchangeService, CurrenciesService],
})
export class ExchangeModule {}
