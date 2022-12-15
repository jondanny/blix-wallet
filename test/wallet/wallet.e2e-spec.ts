import { HttpStatus, INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { v4 as uuid } from 'uuid';
import { faker } from '@faker-js/faker';
import * as request from 'supertest';
import { AppBootstrapManager } from '@src/app-bootstrap.manager';
import { AppDataSource } from '@src/config/datasource';
import { TestHelper } from '@test/helpers/test.helper';
import { WalletFactory } from '@src/database/factories/wallet.factory';
import { WalletType } from '@src/wallet/wallet.types';

describe('Wallet (e2e)', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;
  let testHelper: TestHelper;

  beforeAll(async () => {
    moduleFixture = await AppBootstrapManager.getTestingModule();
    app = moduleFixture.createNestApplication();
    AppBootstrapManager.setAppDefaults(app);
    await AppDataSource.initialize();
    testHelper = new TestHelper(moduleFixture, jest);
    await app.init();
  });

  beforeEach(async () => {
    await testHelper.cleanDatabase();
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(async () => {
    jest.resetAllMocks();
  });

  it(`Should create a metamask wallet and get response`, async () => {
    const { userUuid } = await WalletFactory.createBlix();

    const metamaskCreateData = {
      userUuid,
      walletAddress: faker.finance.ethereumAddress(),
    };

    await request(app.getHttpServer())
      .post('/api/v1/add-metamask')
      .send(metamaskCreateData)
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            userUuid,
            walletAddress: metamaskCreateData.walletAddress,
            type: WalletType.Metamask,
          }),
        );
        expect(response.status).toBe(HttpStatus.CREATED);
      });
  });
});
