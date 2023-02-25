import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { HelpersModule } from '../../helpers/helpers.module';
import { CryptoController } from '../crypto.controller';
import { CryptoService } from '../crypto.service';
import { EthereumService } from '../ethereum.service';

describe('CryptoController', () => {
  let controller: CryptoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, HelpersModule],
      providers: [CryptoService, EthereumService],
      controllers: [CryptoController],
    }).compile();

    controller = module.get<CryptoController>(CryptoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
