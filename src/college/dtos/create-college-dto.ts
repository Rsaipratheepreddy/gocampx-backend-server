import { IsNotEmpty, IsString } from "class-validator";

export class CreateCollegeDto {

    @IsNotEmpty()
    @IsString()
    collegeName: string;

    @IsNotEmpty()
    @IsString()
     address: string;

     @IsNotEmpty()
     @IsString()
     locationUrl: string;
  }