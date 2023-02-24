import { Injectable } from '@nestjs/common';

@Injectable()
export class HelpersService {
  sortAddressesByBalance(addresses: any) {
    return addresses.sort(
      (current: any, next: any) => next.usd_balance - current.usd_balance,
    );
  }
}
