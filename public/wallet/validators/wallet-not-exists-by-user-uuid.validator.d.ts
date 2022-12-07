import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
import { WalletService } from '../wallet.service';
export declare class WalletNotExistsByUserUuidValidator implements ValidatorConstraintInterface {
    private readonly walletService;
    constructor(walletService: WalletService);
    validate(uuid: string, args: ValidationArguments): Promise<boolean>;
    defaultMessage(): string;
}
