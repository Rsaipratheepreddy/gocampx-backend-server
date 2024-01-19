import { Type } from 'class-transformer';
import { IsString, IsUUID, IsObject, IsNotEmpty, IsNumber, IsArray, IsOptional, ValidateNested } from 'class-validator';

export class BindingOrderDetailsDto {

    @IsString()
    @IsNotEmpty()
    pdfUrl: string;

    @IsNotEmpty()
    @IsNumber()
    paperSize: number;

    @IsNotEmpty()
    @IsString()
    orientation: string;

    @IsNotEmpty()
    @IsNumber()
    noOfCopies: number;

    @IsNotEmpty()
    @IsArray()
    @IsNumber({}, { each: true }) // Validates each element in the array as a number
    colorPageNos: number[];

    @IsNotEmpty()
    @IsNumber() // Validates each element in the array as a number
    colorPaperCount: number;
   
    @IsNotEmpty()
    @IsNumber() // Validates each element in the array as a number
    blackAndWhitePaperCount: number;


    @IsNotEmpty()
    @IsString()
    doubleXPrint: string;
    
    @IsOptional()
    @IsString()
    comments: string;
}