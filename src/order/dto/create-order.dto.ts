// order.dto.ts
import { IsString, IsDateString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { BindingOrderDetailsDto } from './order-details.dto';

export class CreateOrderDto {
  @IsString()
  userId: string;

  @IsString()
  serviceId: string;

  @IsString()
  paymentId: string;

  @IsString()
  vendorId: string;

  @IsString()
  orderStatus: string;

  @IsDateString()
  deliveryDate: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BindingOrderDetailsDto)
  orderDetails: BindingOrderDetailsDto[];

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
