import { IsString } from "class-validator";

export class UpdateCollegeDto {

    @IsString()
    collegeName: string;

    @IsString()
    address: string;

    @IsString()
    locationUrl: string;

    @IsString()
    collegeCode: string;
}