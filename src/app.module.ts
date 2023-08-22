import { Module } from '@nestjs/common';
import { ExchangeModule } from './exchange/exchange.module';

@Module({
  imports: [ExchangeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
