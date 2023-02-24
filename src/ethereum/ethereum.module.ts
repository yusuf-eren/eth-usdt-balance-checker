import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { EthereumService } from './ethereum.service';
import { EthereumController } from './ethereum.controller';

@Module({
  imports: [HttpModule],
  providers: [EthereumService],
  controllers: [EthereumController],
})
export class EthereumModule {}
