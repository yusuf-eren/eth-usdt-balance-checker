import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { EthereumService } from './ethereum.service';
import { EthereumController } from './ethereum.controller';
import { HelpersModule } from '../helpers/helpers.module';

@Module({
  imports: [HttpModule, HelpersModule],
  providers: [EthereumService],
  controllers: [EthereumController],
})
export class EthereumModule {}
