import { Repository } from 'typeorm';
import { Currencies } from './currencies.entity';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CurrenciesInputType } from './tyoes/currencies-input.type';
import { validateOrReject } from 'class-validator';

@Injectable()
export class CurrenciesRepository extends Repository<Currencies> {
  async getCurrency(currency: string): Promise<Currencies> {
    const result = await this.findOne({ currency });
    if (!result) {
      throw new InternalServerErrorException();
    }
    return result;
  }
  async createCurrency(
    currenciesInputType: CurrenciesInputType,
  ): Promise<Currencies> {
    const createCurrency = new Currencies();
    Object.assign(createCurrency, currenciesInputType);

    try {
      await validateOrReject(createCurrency);
      await this.save(createCurrency);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    return createCurrency;
  }
  async updateCurrency(currenciesInputType: CurrenciesInputType,
  ): Promise<Currencies> {
    return new Currencies();
  }
  async deleteCurrency(currency: string): Promise<void> {
    return;
  }
}
