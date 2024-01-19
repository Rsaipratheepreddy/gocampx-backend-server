import { IsString, IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { BindingPriceConfig } from './service-price-details';
import { Type } from 'class-transformer';

export class UpdateServiceDto {

    @IsNotEmpty()
    @IsString()
    id: string

    @IsString()
    status: string;

    @IsString()
    type: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => BindingPriceConfig)
    priceConfig: BindingPriceConfig;
}
