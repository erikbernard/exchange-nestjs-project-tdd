import { Repository } from 'typeorm';
import { Currencies } from './currencies.entity';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CurrenciesInputType } from './tyoes/currencies-input.type';

@Injectable()
export class CurrenciesRepository extends Repository<Currencies> {
  async getCurrency(currency: string): Promise<Currencies> {
    const result = await this.findOne({ currency });
    if (!result) {
      throw new InternalServerErrorException();
    }
    return result;
  }
  async createCurrency({
    currency,
    value,
  }: CurrenciesInputType): Promise<Currencies> {
    return new Currencies();
  }
  async updateCurrency({
    currency,
    value,
  }: CurrenciesInputType): Promise<Currencies> {
    return new Currencies();
  }
  async deleteCurrency(currency: string): Promise<void> {
    return;
  }
}
