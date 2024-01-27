import { IsNumber } from "class-validator";

export class BindingPriceConfig {
   
   @IsNumber()
   colorPaperCost: number;

   @IsNumber()
   blackAndWhitePaperCost: number;

}