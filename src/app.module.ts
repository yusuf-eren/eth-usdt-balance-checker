import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EthereumModule } from './ethereum/ethereum.module';
import { HelpersModule } from './helpers/helpers.module';

@Module({
  imports: [EthereumModule, HelpersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
