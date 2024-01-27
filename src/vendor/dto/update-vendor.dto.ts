import { PartialType } from '@nestjs/mapped-types';
import { CreateVendorDto } from './create-vendor.dto';
import { IsEmail, IsEnum, IsMobilePhone, IsNotEmpty, IsString } from 'class-validator';

export class UpdateVendorDto {
    
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    password: string;

    @IsEmail()
    email: string

    @IsEnum(['admin', 'user'])
    authType: string

    @IsMobilePhone()
    mobileNo: number

    @IsString()
    shopName: string

    @IsString()
    shopAddress: string

    services: string[]

}
