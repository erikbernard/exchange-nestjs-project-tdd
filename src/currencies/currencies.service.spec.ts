import { Test, TestingModule } from '@nestjs/testing';
import { CurrenciesRepository, CurrenciesService } from './currencies.service';
import { InternalServerErrorException } from '@nestjs/common';

describe('CurrenciesService', () => {
  let service: CurrenciesService;
  let repository: CurrenciesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CurrenciesService,
        {
          provide: CurrenciesRepository,
          useFactory: () => ({ getCurrency: jest.fn() }),
        },
      ],
    }).compile();

    service = module.get<CurrenciesService>(CurrenciesService);
    repository = module.get<CurrenciesRepository>(CurrenciesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('getCurrency()', () => {
    it('should be throw if repository throw', async () => {
      (repository.getCurrency as jest.Mock).mockRejectedValue(
        new InternalServerErrorException(),
      );
      await expect(service.getCurrency('INVALID')).rejects.toThrow(
        new InternalServerErrorException(),
      );
    });
    it('should be not throw if repository returns', async () => {
      await expect(service.getCurrency('USD')).resolves.not.toThrow();
    });
    it('should be called repository with correct params', async () => {
      await service.getCurrency('USD');
      expect(repository.getCurrency).toBeCalledWith('USD');
    });
    it('should be called repository with correct params', async () => {
      (repository.getCurrency as jest.Mock).mockReturnValue({
        currency: 'USD',
        value: 1,
      });
      await service.getCurrency('USD');
      expect(await service.getCurrency('USD')).toEqual({
        currency: 'USD',
        value: 1,
      });
    });
  });
});
