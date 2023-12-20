import { IsEmail, IsEnum, IsMobilePhone, IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto {
    @IsString()
    userName: string;

    @IsNotEmpty()
    @IsString()
    password: string;

}
