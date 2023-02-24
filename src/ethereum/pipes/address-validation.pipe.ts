import { Injectable, PipeTransform } from '@nestjs/common';
import { isAddress } from 'ethers';

@Injectable()
export class AddressValidationPipe implements PipeTransform {
  transform(addresses: string[]) {
    const validAddresses = [];
    const invalidAddresses = [];

    for (const address of addresses) {
      if (isAddress(address)) validAddresses.push(address);
      else invalidAddresses.push(address);
    }

    return { validAddresses, invalidAddresses };
  }
}
