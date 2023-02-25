import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class CryptoService {
  constructor(private readonly httpService: HttpService) {}

  async getExchangeRate({ from, to }) {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${from}&vs_currencies=${to}`;
    return await this.httpService.axiosRef
      .get(url)
      .then((data) => data.data.ethereum?.usd)
      .catch((e) => {
        throw new HttpException(e, 500);
      });
  }
}
