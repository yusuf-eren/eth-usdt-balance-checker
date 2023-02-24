import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { HelpersModule } from '../helpers/helpers.module';
import { EthereumController } from './ethereum.controller';
import { EthereumService } from './ethereum.service';

describe('EthereumController', () => {
  let controller: EthereumController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, HelpersModule],
      providers: [EthereumService],
      controllers: [EthereumController],
    }).compile();

    controller = module.get<EthereumController>(EthereumController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
