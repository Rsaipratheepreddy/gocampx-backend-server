import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Order } from './entities/order.entity';
import { Service } from '../services/entities/service.entity';
import { Vendor } from '../vendor/entities/vendor.entity';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [TypeOrmModule.forFeature([Order, User, Service, Vendor])]
})
export class OrderModule { }
