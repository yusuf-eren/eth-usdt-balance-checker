import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

@Injectable()
export class EthereumService {
  constructor(private readonly httpService: HttpService) {}

  async checkBalances(addresses: string[]) {
    const promises = [];
    for (const address of addresses) {
      const url = `https://api.ethplorer.io/getAddressInfo/${address}?apiKey=freekey`;
      const balance = this.httpService.axiosRef
        .get(url)
        .then((data) => data.data.ETH.balance);
      promises.push(balance);
    }

    return await Promise.all(promises);
  }

  async ethToUsd() {
    const url =
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd';
    return await this.httpService.axiosRef
      .get(url)
      .then((data) => data.data.ethereum?.usd)
      .catch((e) => e);
  }

  async sortAddresses(addresses: string[]) {
    const price = await this.ethToUsd();
  }
}
