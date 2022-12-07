"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Web3Service = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const web3_types_1 = require("./web3.types");
const digikraftNftContractAbi_1 = require("./abi/digikraftNftContractAbi");
let Web3Service = class Web3Service {
    constructor(web3, configService) {
        this.web3 = web3;
        this.configService = configService;
        this.nftContractAddress = configService.get('web3Config.nftContractAddress');
        this.digikraftNftContract = new this.web3.eth.Contract(digikraftNftContractAbi_1.digikraftNftContractAbi, this.nftContractAddress);
        this.web3.eth.getBlockNumber().then((res) => {
            this.firstBlockNumber = res;
        });
    }
    async sendSignedTx(contractAddress, contract, callerAccount, func, params) {
        try {
            const txnData = contract.methods[func](...params).encodeABI();
            const estimatedGas = await this.web3.eth.estimateGas({
                to: contractAddress,
                from: callerAccount.address,
                data: txnData,
            });
            const signedTransaction = await this.web3.eth.accounts.signTransaction({
                to: contractAddress,
                from: callerAccount.address,
                gas: estimatedGas,
                gasPrice: 100000000000,
                data: txnData,
            }, callerAccount.privateKey);
            let txHash;
            await this.web3.eth.sendSignedTransaction(signedTransaction.rawTransaction).once('transactionHash', (hash) => {
                console.log('txHash:', hash);
                txHash = hash;
            });
            if (func === 'safeTransferFrom' || func === 'mint' || func === 'burn') {
                const events = await contract.getPastEvents('Transfer', {
                    fromBlock: this.firstBlockNumber,
                    toBlock: 'latest',
                }, (err) => {
                    if (err) {
                        throw new Error('Failed to get events among the given blocks');
                    }
                });
                const tokenId = events.filter((event) => event.transactionHash === txHash)[0].returnValues.tokenId;
                this.firstBlockNumber = await this.web3.eth.getBlockNumber();
                return { txHash, tokenId };
            }
            else if (func === 'addAdmin') {
                this.firstBlockNumber = await this.web3.eth.getBlockNumber();
                return { txHash };
            }
        }
        catch (error) {
            throw error;
        }
    }
    async createWallet() {
        try {
            const wallet = await this.web3.eth.accounts.create();
            return { address: wallet.address, privateKey: wallet.privateKey };
        }
        catch (error) {
            throw error;
        }
    }
    async getMaticBalance(address) {
        try {
            const balance = await this.web3.eth.getBalance(address);
            return balance / 10 ** 18;
        }
        catch (error) {
            throw error;
        }
    }
    async transferMatic(privateKey, from, to, amount) {
        try {
            const signedTransaction = await this.web3.eth.accounts.signTransaction({
                to,
                from,
                gas: 21000,
                gasPrice: 50000000000,
                value: amount * 10 ** 18,
            }, privateKey);
            let txHash;
            await this.web3.eth.sendSignedTransaction(signedTransaction.rawTransaction).once('transactionHash', (hash) => {
                console.log('txHash:', hash);
                txHash = hash;
            });
            return txHash;
        }
        catch (error) {
            throw error;
        }
    }
    async transferNft(operator, from, to, tokenId) {
        const adminAccount = this.web3.eth.accounts.privateKeyToAccount(operator);
        const res = await this.sendSignedTx(this.nftContractAddress, this.digikraftNftContract, adminAccount, 'safeTransferFrom', [from, to, tokenId]);
        if (!res) {
            throw new Error('Failed to send signed transaction');
        }
        else if (!res.tokenId || `${tokenId}` !== res.tokenId) {
            throw new Error('Failed to transfer');
        }
        console.log(`'${from}' transfered ticket #${tokenId} to '${to}'`);
        return res.txHash;
    }
};
Web3Service = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(web3_types_1.WEB3_PROVIDER_TOKEN)),
    __metadata("design:paramtypes", [Object, config_1.ConfigService])
], Web3Service);
exports.Web3Service = Web3Service;
//# sourceMappingURL=web3.service.js.map