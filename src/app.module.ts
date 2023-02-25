import { Module } from '@nestjs/common';
import { CryptoModule } from './crypto/crypto.module';
import { HelpersModule } from './helpers/helpers.module';

@Module({
  imports: [CryptoModule, HelpersModule],
})
export class AppModule {}
