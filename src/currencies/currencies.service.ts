import { Injectable, InternalServerErrorException } from '@nestjs/common';

export class CurrenciesRepository {
  async getCurrency(currency: string): Promise<any> {}
}
@Injectable()
export class CurrenciesService {
  constructor(private currencyRepository: CurrenciesRepository) {}
  async getCurrency(currency: string): Promise<any> {
    try {
      return await this.currencyRepository.getCurrency(currency);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
