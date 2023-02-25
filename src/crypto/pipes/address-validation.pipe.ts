import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isAddress } from 'ethers';
import { AddressesDto } from '../dtos/addresses.dto';

@Injectable()
export class AddressValidationPipe implements PipeTransform {
  transform(addresses: any): AddressesDto {
    if (!Array.isArray(addresses))
      throw new BadRequestException('Body should be an array');

    const validAddresses = [];
    const invalidAddresses = [];

    for (const address of addresses) {
      isAddress(address)
        ? validAddresses.push(address)
        : invalidAddresses.push(address);
    }

    if (validAddresses.length === 0)
      throw new BadRequestException('No valid addresses provided');

    return { validAddresses, invalidAddresses };
  }
}
