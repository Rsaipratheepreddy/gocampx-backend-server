import { PartialType } from '@nestjs/mapped-types';
import { CreateWalletDto } from './create-wallet.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateWalletDto extends PartialType(CreateWalletDto) {

    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    availableCoins: number;

    @IsString()
    cashbackCoins: number;

    @IsString()
    redeemedCoins: number;
}
