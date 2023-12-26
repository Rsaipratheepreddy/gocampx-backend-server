import { IsNotEmpty, IsString } from "class-validator";

export class CreateWalletDto {

    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    availableCoins: number;

    @IsString()
    @IsNotEmpty()
    cashbackCoins: number;

    @IsString()
    @IsNotEmpty()
    redeemedCoins: number;

}
