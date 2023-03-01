import { Injectable } from '@nestjs/common';
import { Contract, ethers, Provider } from 'ethers';

@Injectable()
export class EthereumService {
  token = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
  abi: string[] = [
    // Read-Only Functions
    'function balanceOf(address owner) view returns (uint256)',
    'function decimals() view returns (uint8)',
  ];

  provider: Provider | undefined;
  contract: Contract | undefined;

  constructor() {
    this.provider = new ethers.InfuraProvider('mainnet');
    this.contract = new ethers.Contract(this.token, this.abi, this.provider);
  }

  async getBalances(addresses: string[], exchangeRate: number) {
    const promises = [];

    for (const address of addresses) {
      const balance = this.provider
        .getBalance(address)
        .then(async (balance) => {
          const tokenPromises = [
            this.contract.balanceOf(address),
            this.contract.decimals(),
          ];

          const eth_balance = parseFloat(ethers.formatEther(balance));
          const usdtBalance = await Promise.all(tokenPromises).then(
            ([USDT, decimal]) => Number(USDT) / Number(BigInt(10) ** decimal),
          );

          return {
            address,
            eth_balance,
            usd_balance: eth_balance * exchangeRate + usdtBalance,
          };
        })
        .catch((error) => console.log(error));

      promises.push(balance);
    }

    return await Promise.all(promises);
  }
}
