import { HttpStatus, INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppBootstrapManager } from '@src/app-bootstrap.manager';
import { AppDataSource } from '@src/config/datasource';
import { TestHelper } from '@test/helpers/test.helper';
import { NftFactory } from '@src/database/factories/nft.factory';

describe('Nft (e2e)', () => {
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

  it(`Should get all existing nfts for a specific userUuid`, async () => {
    const userUuid = 'RIQU3JFD2YM2LDxvxGHBNtfKDw12';

    const nft = await NftFactory.mintToBlixWallet({ userUuid });

    await request(app.getHttpServer())
      .get(`/api/v1/nft?userUuid=${userUuid}`)
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: nft.id,
              tokenId: nft.tokenId,
              userUuid: nft.userUuid,
              walletType: nft.walletType,
            }),
          ]),
        );
        expect(response.status).toBe(HttpStatus.OK);
      });
  });
});
