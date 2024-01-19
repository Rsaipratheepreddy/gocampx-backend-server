import { IsString, IsUUID, IsObject, IsNotEmpty, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { BindingPriceConfig } from './service-price-details';
import { Type } from 'class-transformer';

export class CreateServiceDto {

    @IsNotEmpty()
    @IsString()
    status: string;

    @IsNotEmpty()
    @IsString()
    type: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => BindingPriceConfig)
    priceConfig: BindingPriceConfig;
}
