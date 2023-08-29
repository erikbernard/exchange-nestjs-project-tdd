import { Test, TestingModule } from '@nestjs/testing';
import { CurrenciesRepository } from './currencies.repository';
import { InternalServerErrorException } from '@nestjs/common';
import { Currencies } from './currencies.entity';

describe('CurrenciesRepository', () => {
  let repository;
  let mockData;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurrenciesRepository],
    }).compile();
    repository = module.get<CurrenciesRepository>(CurrenciesRepository);
    mockData = {
      currency: 'USD',
      value: 1,
    } as Currencies;
  });
  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('getCurrency()', () => {
    it('should be called findOne with correct params', async () => {
      repository.findOne = jest.fn().mockReturnValue({ currency: 'USD' });
      await repository.getCurrency('USD');
      expect(repository.findOne).toBeCalledWith({ currency: 'USD' });
    });
    it('should be throw findOne return empty', async () => {
      repository.findOne = jest.fn().mockReturnValue(undefined);
      await expect(repository.getCurrency('USD')).rejects.toThrow(
        new InternalServerErrorException(),
      );
    });
    it('should be returns when findOne returns', async () => {
      repository.findOne = jest.fn().mockReturnValue(mockData);
      await expect(repository.getCurrency('USD')).toEqual(mockData);
    });
  });
  describe('createCurrency()', () => {
    beforeEach(() => {
      repository.save = jest.fn();
    });
    it('should be called save with correct params', async () => {
      repository.save = jest.fn().mockReturnValue(mockData);
      await repository.createCurrency(mockData);
      expect(repository.save).toBeCalledWith(mockData);
    });
  });
});
