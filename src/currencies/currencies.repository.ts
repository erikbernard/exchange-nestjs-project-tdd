import { Repository } from 'typeorm';
import { Currencies } from './currencies.entity';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class CurrenciesRepository extends Repository<Currencies> {
  async getCurrency(currency: string): Promise<Currencies> {
    const result = await this.findOne({ currency });
    if (!result) {
      throw new InternalServerErrorException();
    }
    return result;
  }
  async createCurrency({ currency, value }): Promise<Currencies> {
    return new Currencies();
  }
  async updateCurrency({ currency, value }): Promise<Currencies> {
    return new Currencies();
  }
  async deleteCurrency(currency: string): Promise<void> {
    return;
  }
}
