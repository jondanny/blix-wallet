import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { v4 as uuid } from 'uuid';
import { AppBootstrapManager } from '@src/app-bootstrap.manager';
import { AppDataSource } from '@src/config/datasource';
import { Web3Service } from '@src/web3/web3.service';
import { NftService } from '@src/nft/nft.service';
import { TestHelper } from '@test/helpers/test.helper';
import { AdminWalletFactory } from '@src/database/factories/admin-wallet.factory';
import { WalletFactory } from '@src/database/factories/wallet.factory';
import { NftFactory } from '@src/database/factories/nft.factory';
import { WalletType } from '@src/wallet/wallet.types';

jest.setTimeout(30000);

describe('Web3 (e2e)', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;
  let testHelper: TestHelper;
  let web3Service: Web3Service;
  let nftService: NftService;

  beforeAll(async () => {
    moduleFixture = await AppBootstrapManager.getTestingModule();
    web3Service = moduleFixture.get(Web3Service);
    nftService = moduleFixture.get(NftService);
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

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it(`Should post empty userUuid and return validation errors in response`, async () => {
    await request(app.getHttpServer())
      .post('/api/v1/create-wallet')
      .send({})
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.body.message).toEqual(
          expect.arrayContaining(['userUuid must be shorter than or equal to 64 characters']),
        );
      });
  });

  it('Should create a wallet and return wallet address', async () => {
    const userUuid = uuid();

    await request(app.getHttpServer())
      .post('/api/v1/create-wallet')
      .send({ userUuid })
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.body).toEqual(expect.objectContaining({ walletAddress: expect.any(String) }));
      });
  });

  it('Should transfer Nft to metamsk wallet', async () => {
    const admin = await AdminWalletFactory.getAdmin();

    const userUuid = uuid();

    const { address: walletAddress, privateKey } = await web3Service.createWallet();

    const blixWallet = await WalletFactory.createBlix({ userUuid, walletAddress, privateKey });

    const { address: metamaskAddress } = await web3Service.createWallet();

    await WalletFactory.createMetamask({ userUuid, walletAddress: metamaskAddress });

    const tokenId = await web3Service.mint(admin.privateKey, blixWallet.walletAddress, 'metadata_uri', 500);

    const { id: nftId } = await NftFactory.mintToBlixWallet({ tokenId, userUuid });

    const nftTransferData = {
      userUuid,
      tokenId,
    };

    await request(app.getHttpServer())
      .post('/api/v1/transfer-to-metamask')
      .send(nftTransferData)
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.body).toEqual(expect.objectContaining({ transactionHash: expect.any(String) }));
      });

    const updatedNft = await nftService.findOne(nftId);
    expect(updatedNft.walletType).toEqual(WalletType.Metamask);
  });
});
