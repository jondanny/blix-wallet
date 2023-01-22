export const WEB3_PROVIDER_TOKEN = 'Web3ProviderToken';
export const BICONOMY_PROVIDER_TOKEN = 'BiconomyProviderToken';

export enum Web3EventPattern {
  WalletCreate = 'web3.wallet.create',
  WalletCreateReply = 'web3.wallet.create.reply',
  NftMint = 'web3.nft.mint',
  NftMintReply = 'web3.nft.mint.reply',
  NftTransfer = 'web3.nft.transfer',
  NftTransferReply = 'web3.nft.transfer.reply',
  NftBurn = 'web3.nft.burn',
  NftBurnReply = 'web3.nft.burn.reply',
}

export enum Web3QueueActions {
  Mint = 'mint',
  Transfer = 'transfer',
  RefillMatic = 'refill-matic',
  RefillAllAccounts = 'refill-all-accounts',
}

export const WEB3_QUEUE = 'web3-queue';

export interface SyncJobBody {
  id: number;
  body?: any;
}
