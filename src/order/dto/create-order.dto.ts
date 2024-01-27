// order.dto.ts
import { IsString, IsDateString, IsArray, ValidateNested, isNotEmpty, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { BindingOrderDetailsDto } from './order-details.dto';

export class CreateOrderDto {

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  serviceId: string;

  @IsNotEmpty()
  @IsString()
  paymentId: string;

  @IsNotEmpty()
  @IsString()
  vendorId: string;

  @IsString()
  orderStatus: string;

  @IsNotEmpty()
  @IsDateString()
  deliveryDate: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BindingOrderDetailsDto)
  orderDetails: BindingOrderDetailsDto[];

  @IsNotEmpty()
  @IsString()
  orderOtp: string;
}

export class BindingOrderPriceDetails {
   blackWhitePaperTotalCost : number;
   colorPapersTotalCost : number;
   totalCopies: number;
   totalAmount: number;
   deliveryCharges: number;
}
