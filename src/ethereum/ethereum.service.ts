import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

@Injectable()
export class EthereumService {
  constructor(private readonly httpService: HttpService) {}

  async getBalances(addresses: string[], exchangeRate: number) {
    const promises = [];

    const provider = new ethers.InfuraProvider('mainnet');

    for (const address of addresses) {
      const balance = provider
        .getBalance(address)
        .then((balance) => {
          const eth_balance = parseFloat(ethers.formatEther(balance));
          return {
            address,
            eth_balance,
            usd_balance: eth_balance * exchangeRate,
          };
        })
        .catch((error) => console.log(error));

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
      .catch((e) => {
        throw new HttpException(e, 500);
      });
  }
}
