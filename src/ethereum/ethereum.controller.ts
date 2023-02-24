import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { EthereumService } from './ethereum.service';
import { AddressValidationPipe } from './pipes/address-validation.pipe';

@Controller('ethereum')
export class EthereumController {
  constructor(private ethereumService: EthereumService) {}

  @Post('get-balance')
  @UsePipes(new ValidationPipe({ transform: true }), AddressValidationPipe)
  async getBalances(@Body() body: any) {
    const { invalidAddresses, validAddresses } = body;
    const balancesWithAddresses = await this.ethereumService.checkBalances(
      validAddresses,
    );

    return balancesWithAddresses;

    // const sortedAddresses = this.ethereumService.sortAddresses(
    //   balancesWithAddresses,
    // );
    // console.log(balancesWithAddresses)
    // return {
    //   invalid_addresses: invalidAddresses,
    //   sorted_addresses: sortedAddresses,
    // };
  }
}
