import { IsEmail, IsEnum, IsMobilePhone, IsNotEmpty, IsString } from "class-validator";

export class CreateVendorDto {

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    userName: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsEnum(['admin', 'user'])
    authType: string

    @IsNotEmpty()
    @IsMobilePhone()
    mobileNo: number

    @IsNotEmpty()
    @IsString()
    shopName: string

    @IsNotEmpty()
    @IsString()
    shopAddress: string

    @IsNotEmpty()
    services: string[]


}
