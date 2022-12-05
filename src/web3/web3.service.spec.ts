import { Test, TestingModule } from '@nestjs/testing';
import { SignedTransaction } from 'web3-core-promievent';
import { AppModule } from '../app.module';
import { txReturnProps, Web3Service } from './web3.service';
import { Account } from 'web3-core';

describe('Web3Service', () => {
  let web3Service: Web3Service;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    web3Service = module.get<Web3Service>(Web3Service);

    jest.spyOn(web3Service.web3.eth, 'estimateGas').mockImplementation(async (): Promise<number> => 324000);
    jest.spyOn(web3Service.web3.eth, 'sendSignedTransaction').mockImplementation(async () => ({}));
    jest.spyOn(web3Service.web3.eth, 'getTransactionCount').mockImplementation(async (): Promise<number> => 1);
    jest.spyOn(web3Service.web3.eth, 'getBlockNumber').mockImplementation(async (): Promise<number> => 234560);
    jest
      .spyOn(web3Service, 'sendSignedTx')
      .mockImplementation(async (): Promise<txReturnProps> => ({ tokenId: '1', txHash: '0xHash' }));
    jest.spyOn(web3Service.web3.eth.accounts, 'privateKeyToAccount').mockImplementation((): Account => ({} as Account));
    jest
      .spyOn(web3Service.web3.eth.accounts, 'signTransaction')
      .mockImplementation((): SignedTransaction => ({ transactionHash: '0xHash' }));
    jest.spyOn(web3Service.web3.eth.accounts, 'create').mockImplementation((): Account => ({} as Account));
    jest
      .spyOn(web3Service.digikraftNftContract.methods, 'transferNft')
      .mockImplementation(() => ({ encodeABI: (): string => '0xEncodeABI' }));
    jest.spyOn(web3Service.digikraftNftContract, 'getPastEvents').mockImplementation(() => ({ encodeABI: () => [] }));
  });

  it('should be defined', () => {
    expect(web3Service).toBeDefined();
  });

  it('create wallet', async () => {
    const result = await web3Service.createWallet();

    expect(result).toHaveProperty('address');
    expect(result).toHaveProperty('privateKey');
  });

  it('tranfer token', async () => {
    const mockSenderAddress = '0x73ed8E93866E6c40fB259C1Dad34181EB99D024B';
    const mockReceiverAddress = '0x077A09B5D3aFd37644e07A29eEDf5c12F3F8bef7';
    const mockPrivateKey = '0x36e8d50cac404e3539resif840aa340f662ae9d1886f1a8d8b126a1ab40183d0';

    await expect(web3Service.transferNft(mockPrivateKey, mockSenderAddress, mockReceiverAddress, 1));
  });
});
