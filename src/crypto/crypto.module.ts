import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { EthereumService } from './ethereum.service';
import { CryptoController } from './crypto.controller';
import { HelpersModule } from '../helpers/helpers.module';
import { CryptoService } from './crypto.service';

@Module({
  imports: [HttpModule, HelpersModule],
  providers: [CryptoService, EthereumService],
  controllers: [CryptoController],
})
export class CryptoModule {}
