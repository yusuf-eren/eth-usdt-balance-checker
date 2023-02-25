import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { HelpersModule } from '../../helpers/helpers.module';
import { CryptoController } from '../crypto.controller';
import { CryptoService } from '../crypto.service';
import { EthereumService } from '../ethereum.service';

describe('EthereumService', () => {
  let service: EthereumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, HelpersModule],
      providers: [CryptoService, EthereumService],
      controllers: [CryptoController],
    }).compile();

    service = module.get<EthereumService>(EthereumService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should ', async () => {
    const balancesWithAddresses = await service.getBalances(
      [
        '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
        '0xb794f5ea0ba39494ce839613fffba74279579268',
        '0xfeC4A115911A120FdEd09a025b32D51e965E1214',
      ],
      1,
    );

    for (const object of balancesWithAddresses) {
      expect(object.usd_balance).toBeDefined();
      expect(object.eth_balance).toBeDefined();
      expect(object.address).toBeDefined();
    }
  });
});
