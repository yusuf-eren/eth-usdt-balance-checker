import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EthereumModule } from './ethereum/ethereum.module';

@Module({
  imports: [EthereumModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
