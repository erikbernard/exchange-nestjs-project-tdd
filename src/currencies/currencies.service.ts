import { BadRequestException, Injectable } from '@nestjs/common';

export class Currencies {
  currency: string;
  value: any;
}
export class CurrenciesRepository {
  async getCurrency(currency: string): Promise<Currencies> {
    return new Currencies();
  }
  async createCurrency({ currency, value }): Promise<Currencies> {
    return new Currencies();
  }
  async updateCurrency({ currency, value }): Promise<Currencies> {
    return new Currencies();
  }
}
@Injectable()
export class CurrenciesService {
  constructor(private currencyRepository: CurrenciesRepository) {}
  async getCurrency(currency: string): Promise<Currencies> {
    return await this.currencyRepository.getCurrency(currency);
  }
  async createCurrency({ currency, value }): Promise<Currencies> {
    if (value <= 0) {
      throw new BadRequestException('The value must be greater zero.');
    }
    return await this.currencyRepository.createCurrency({ currency, value });
  }
  async updateCurrency({ currency, value }): Promise<Currencies> {
    if (value <= 0) {
      throw new BadRequestException('The value must be greater zero.');
    }
    return await this.currencyRepository.updateCurrency({ currency, value });
  }
}
