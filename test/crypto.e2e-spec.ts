import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('CryptoController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST (200) crypto/ethereum/get-balances', async () => {
    const response = await request(app.getHttpServer())
      .post('/crypto/ethereum/get-balances')
      .send([
        '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
        '0xb794f5ea0ba39494ce839613fffba74279579268',
        '123',
        {},
        1,
        [],
        '23q4523',
        '0xfeC4A115911A120FdEd09a025b32D51e965E1214',
      ])
      .expect(200);

    expect(response.body.invalid_addresses).toStrictEqual([
      '123',
      {},
      1,
      [],
      '23q4523',
    ]);

    expect(response.body.sorted_addresses.length).toBeGreaterThanOrEqual(1);

    for (const object of response.body.sorted_addresses) {
      expect(object.usd_balance).toBeDefined();
      expect(object.usd_balance).toEqual(expect.any(Number));

      expect(object.eth_balance).toBeDefined();
      expect(object.eth_balance).toEqual(expect.any(Number));

      expect(object.address).toBeDefined();
      expect(typeof object.address).toEqual('string');
    }
  });

  it('POST (400) crypto/ethereum/get-balances', async () => {
    const response = await request(app.getHttpServer())
      .post('/crypto/ethereum/get-balances')
      .send(['sadas', 'test', 'novalidaddr'])
      .expect(400);

    expect(response.body).toStrictEqual({
      message: 'No valid addresses provided',
      statusCode: 400,
      error: 'Bad Request',
    });

    const response2 = await request(app.getHttpServer())
      .post('/crypto/ethereum/get-balances')
      .send({})
      .expect(400);

    expect(response2.body).toStrictEqual({
      message: 'Body should be an array',
      statusCode: 400,
      error: 'Bad Request',
    });
  });
});
