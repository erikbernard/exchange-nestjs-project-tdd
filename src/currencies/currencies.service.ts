import { BadRequestException, Injectable } from '@nestjs/common';
import { CurrenciesRepository } from './currencies.repository';
import { Currencies } from './currencies.entity';
import { CurrenciesInputType } from './tyoes/currencies-input.type';

@Injectable()
export class CurrenciesService {
  constructor(private currencyRepository: CurrenciesRepository) {}
  async getCurrency(currency: string): Promise<Currencies> {
    return await this.currencyRepository.getCurrency(currency);
  }
  async createCurrency({
    currency,
    value,
  }: CurrenciesInputType): Promise<Currencies> {
    if (value <= 0) {
      throw new BadRequestException('The value must be greater zero.');
    }
    return await this.currencyRepository.createCurrency({ currency, value });
  }
  async updateCurrency({
    currency,
    value,
  }: CurrenciesInputType): Promise<Currencies> {
    if (value <= 0) {
      throw new BadRequestException('The value must be greater zero.');
    }
    return await this.currencyRepository.updateCurrency({ currency, value });
  }
  async deleteCurrency(currency: string): Promise<void> {
    return await this.currencyRepository.deleteCurrency(currency);
  }
}
