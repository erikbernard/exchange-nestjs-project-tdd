import { Test, TestingModule } from '@nestjs/testing';
import { CurrenciesService, ExchangeService } from './exchange.service';
import { BadRequestException } from '@nestjs/common';
import { ExchangeInputType } from './types/exchange-input.type';

describe('ExchangeService', () => {
  let service: ExchangeService;
  let currenciesService: CurrenciesService;
  let mockData;

  beforeEach(async () => {
    const currenciesServiceMock = {
      getCurrency: jest.fn().mockReturnValue({ value: 1 }),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExchangeService,
        { provide: CurrenciesService, useFactory: () => currenciesServiceMock },
      ],
    }).compile();
    mockData = { from: 'USD', to: 'BRL', amount: 1 } as ExchangeInputType;
    service = module.get<ExchangeService>(ExchangeService);
    currenciesService = module.get<CurrenciesService>(CurrenciesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('convertAmount', () => {
    it('should be throw if called with invalid params', async () => {
      mockData.from = '';
      await expect(service.convertAmount(mockData)).rejects.toThrow(
        new BadRequestException(),
      );
      mockData.from = 'USD';
      mockData.amount = 0;
      await expect(service.convertAmount(mockData)).rejects.toThrow(
        new BadRequestException(),
      );
      mockData.from = 'USD';
      mockData.to = '';
      mockData.amount = 1;
      await expect(service.convertAmount(mockData)).rejects.toThrow(
        new BadRequestException(),
      );
    });
    it('should be not throw if called with valid params', async () => {
      await expect(service.convertAmount(mockData)).resolves.not.toThrow();
    });
    it('should be called getCurrency twice', async () => {
      await service.convertAmount({
        from: 'USD',
        to: 'BRL',
        amount: 1,
      } as ExchangeInputType);
      expect(currenciesService.getCurrency).toBeCalledTimes(2);
    });
    it('should be called getCurrency with correct params', async () => {
      await service.convertAmount({
        from: 'USD',
        to: 'BRL',
        amount: 1,
      } as ExchangeInputType);
      expect(currenciesService.getCurrency).toBeCalledWith('USD');
      expect(currenciesService.getCurrency).toHaveBeenLastCalledWith('BRL');
    });
    it('should be throw when getCurrency throw', async () => {
      (currenciesService.getCurrency as jest.Mock).mockRejectedValue(
        new Error(),
      );
      mockData.from = 'INVALID';
      expect(service.convertAmount(mockData)).rejects.toThrow();
    });
    it('should be return conversion value', async () => {
      (currenciesService.getCurrency as jest.Mock).mockResolvedValueOnce({
        value: 1,
      });
      expect(
        await service.convertAmount({
          from: 'USD',
          to: 'USD',
          amount: 1,
        }),
      ).toEqual({
        amount: 1,
      });
      (currenciesService.getCurrency as jest.Mock).mockResolvedValueOnce({
        value: 1,
      });
      (currenciesService.getCurrency as jest.Mock).mockResolvedValueOnce({
        value: 0.2,
      });
      expect(await service.convertAmount(mockData)).toEqual({
        amount: 5,
      });

      (currenciesService.getCurrency as jest.Mock).mockResolvedValueOnce({
        value: 0.2,
      });
      (currenciesService.getCurrency as jest.Mock).mockResolvedValueOnce({
        value: 1,
      });
      mockData.from = 'BRL';
      mockData.to = 'USD';
      expect(await service.convertAmount(mockData)).toEqual({
        amount: 0.2,
      });
    });
  });
});
