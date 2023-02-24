import { Test, TestingModule } from '@nestjs/testing';
import { HelpersService } from './helpers.service';

describe('HelpersService', () => {
  let service: HelpersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HelpersService],
    }).compile();

    service = module.get<HelpersService>(HelpersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should sort arrays of objects', () => {
    const objects = [
      {
        address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
        eth_balance: 33.61209407660136,
        usd_balance: 53899.00957747487,
      },

      {
        address: '0xfeC4A115911A120FdEd09a025b32D51e965E1214',
        eth_balance: 0,
        usd_balance: 0,
      },
      {
        address: '0xb794f5ea0ba39494ce839613fffba74279579268',
        eth_balance: 0.32983685947070773,
        usd_balance: 528.9131943728481,
      },
    ];

    expect(service.sortAddressesByBalance(objects)).toStrictEqual([
      {
        address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
        eth_balance: 33.61209407660136,
        usd_balance: 53899.00957747487,
      },
      {
        address: '0xb794f5ea0ba39494ce839613fffba74279579268',
        eth_balance: 0.32983685947070773,
        usd_balance: 528.9131943728481,
      },
      {
        address: '0xfeC4A115911A120FdEd09a025b32D51e965E1214',
        eth_balance: 0,
        usd_balance: 0,
      },
    ]);
  });
});
