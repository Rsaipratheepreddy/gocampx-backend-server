import { IsString, IsUUID, IsObject, IsNotEmpty, IsNumber, IsArray } from 'class-validator';

export class OrderDetailsDto {
    
    @IsString()
    @IsNotEmpty()
    pdfUrl: string;

    @IsNotEmpty()
    @IsNumber()
    noOfCopies: number;

    @IsNotEmpty()
    @IsArray()
    @IsNumber({}, { each: true }) // Validates each element in the array as a number
    colorPageNos: number[];

    @IsNotEmpty()
    @IsNumber()

   
    @IsString()
    @IsNotEmpty()
    status: string;
}
