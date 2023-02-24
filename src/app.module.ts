import { Module } from '@nestjs/common';
import { EthereumModule } from './ethereum/ethereum.module';
import { HelpersModule } from './helpers/helpers.module';

@Module({
  imports: [EthereumModule, HelpersModule],
})
export class AppModule {}
