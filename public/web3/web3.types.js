"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Web3EventPattern = exports.BICONOMY_PROVIDER_TOKEN = exports.WEB3_PROVIDER_TOKEN = void 0;
exports.WEB3_PROVIDER_TOKEN = 'Web3ProviderToken';
exports.BICONOMY_PROVIDER_TOKEN = 'BiconomyProviderToken';
var Web3EventPattern;
(function (Web3EventPattern) {
    Web3EventPattern["WalletCreate"] = "web3.wallet.create";
    Web3EventPattern["WalletCreateReply"] = "web3.wallet.create.reply";
    Web3EventPattern["NftMint"] = "web3.nft.mint";
    Web3EventPattern["NftMintReply"] = "web3.nft.mint.reply";
    Web3EventPattern["NftTransfer"] = "web3.nft.transfer";
    Web3EventPattern["NftTransferReply"] = "web3.nft.transfer.reply";
    Web3EventPattern["NftBurn"] = "web3.nft.burn";
    Web3EventPattern["NftBurnReply"] = "web3.nft.burn.reply";
})(Web3EventPattern = exports.Web3EventPattern || (exports.Web3EventPattern = {}));
//# sourceMappingURL=web3.types.js.map