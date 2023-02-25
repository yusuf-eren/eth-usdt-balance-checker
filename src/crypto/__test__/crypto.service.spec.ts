import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { HelpersModule } from '../../helpers/helpers.module';
import { CryptoController } from '../crypto.controller';
import { CryptoService } from '../crypto.service';
import { EthereumService } from '../ethereum.service';

describe('CryptoService', () => {
  let service: CryptoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, HelpersModule],
      providers: [CryptoService, EthereumService],
      controllers: [CryptoController],
    }).compile();

    service = module.get<CryptoService>(CryptoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should exchange eth to usd', async () => {
    const exchangeRate = await service.getExchangeRate({
      from: 'ethereum',
      to: 'usd',
    });

    expect(exchangeRate).toBeDefined();
    expect(exchangeRate).toEqual(expect.any(Number));
  });
});
