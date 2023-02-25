import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { HelpersService } from '../helpers/helpers.service';
import { CryptoService } from './crypto.service';
import { AddressesDto } from './dtos/addresses.dto';
import { EthereumService } from './ethereum.service';
import { AddressValidationPipe } from './pipes/address-validation.pipe';

@Controller('crypto')
export class CryptoController {
  constructor(
    private readonly cryptoService: CryptoService,
    private readonly ethereumService: EthereumService,
    private readonly helpersService: HelpersService,
  ) {}

  @Post('ethereum/get-balances')
  @HttpCode(200)
  @UsePipes(
    AddressValidationPipe,
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  )
  async getBalancesETH(@Body() body: AddressesDto) {
    const { invalidAddresses: invalid_addresses, validAddresses } = body;

    const exchangeRate = await this.cryptoService.getExchangeRate({
      from: 'ethereum',
      to: 'usd',
    });
    const balancesWithAddresses = await this.ethereumService.getBalances(
      validAddresses,
      exchangeRate,
    );
    const sortedAddresses = this.helpersService.sortAddressesByBalance(
      balancesWithAddresses,
    );

    return { invalid_addresses, sorted_addresses: sortedAddresses };
  }
}
