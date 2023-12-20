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
    authType: string

    @IsNotEmpty()
    @IsMobilePhone()
    mobileNo: number

    @IsNotEmpty()
    @IsString()
    collegeId: string

    @IsNotEmpty()
    @IsString()
    referralId: string
    
    @IsString()
    referredBy: string
    
}
