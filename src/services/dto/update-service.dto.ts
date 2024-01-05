import { PartialType } from '@nestjs/mapped-types';
import { OrderDetailsDto } from './create-service.dto';

export class UpdateServiceDto extends PartialType(OrderDetailsDto) {}
