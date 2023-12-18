import { IsEmail, IsEnum, IsMobilePhone, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
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
    @IsEnum(['admin','user' ])
    userType: string

    @IsNotEmpty()
    @IsMobilePhone()
    mobileNo: string

    @IsNotEmpty()
    @IsString()
    collegeName: string

    @IsNotEmpty()
    @IsString()
    referralId: string

    @IsNotEmpty()
    @IsString()
    referredBy: string

    
    
}
