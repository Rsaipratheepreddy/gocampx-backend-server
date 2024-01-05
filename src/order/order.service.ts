import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { BindingOrderPriceDetails, CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { BindingOrderDetailsDto } from './dto/order-details.dto';
import { Service } from 'src/services/entities/service.entity';
import { BindingPriceConfig } from 'src/services/dto/service-price-details';
import { create } from 'domain';
import { Vendor } from 'src/vendor/entities/vendor.entity';

@Injectable()
export class OrderService {

  constructor(
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Service) private readonly serviceRepo: Repository<Service>,
    @InjectRepository(Vendor) private readonly vendorRepository: Repository<Vendor>
  ) { }
 async createOrder(createOrderDto: CreateOrderDto) {
    try {
      const user = await this.userRepository.findOne({where: {id: createOrderDto.userId}})
      if(user == null) {
        return new UnprocessableEntityException("User not found")
      }
      const order = new Order();
      order.userId = createOrderDto.userId;
      order.serviceId = createOrderDto.serviceId;
      order.orderDetails = createOrderDto.orderDetails;
      order.orderPriceDetails = this.getPriceDetails(createOrderDto.serviceId, createOrderDto.orderDetails);
      order.orderStatus = 'created';
      const result = await this.orderRepository.save(order);
      return result;
    } catch(e){
      throw new UnprocessableEntityException();
    }
  }

  async assignVendor(vendorId: string, orderId: string) {
    const vendor = await this.vendorRepository.findOne({ where: { id: vendorId } });
    if (!vendor) {
        throw new UnprocessableEntityException('Vendor not found');
    }
    const order = await this.orderRepository.findOne({ where: { id: orderId } });
    if (!order) {
        throw new UnprocessableEntityException('Order not found');
    }
   order.vendorId = vendor.id;
   const updatedOrder =  await this.orderRepository.save(order);
    return updatedOrder;
}
  
async getAllOrders(){
  return await this.orderRepository.find();
}

async getOrderByServiceType(serviceId: string){
  const orders = await this.orderRepository.find({ where: {serviceId: serviceId}});
  return 
}

  async getPriceDetails(serviceId: string, orderDetails: any) {
    const service = await this.serviceRepo.findOne({where: {id: serviceId}})
    switch(service.type){
      case 'binding': {
        const priceConfig = service.priceConfig as BindingPriceConfig;
        const serviceOrderDetails: BindingOrderDetailsDto[] = orderDetails as BindingOrderDetailsDto[];
        const orderPriceDetails = new BindingOrderPriceDetails()
        let totalBlackWhitePaperCost = 0;
        let totalColorPapersCost = 0;
        let totalCopies = 0
        for(const item of serviceOrderDetails){
          totalBlackWhitePaperCost = totalBlackWhitePaperCost + (item.blackAndWhitePaperCount * priceConfig.blackAndWhitePaperCost);
          totalColorPapersCost = totalColorPapersCost + (item.colorPaperCount * priceConfig.colorPaperCost);
          totalCopies = totalCopies + item.noOfCopies;
        }
        orderPriceDetails.blackWhitePaperTotalCost = totalBlackWhitePaperCost;
        orderPriceDetails.colorPapersTotalCost = totalColorPapersCost;
        orderPriceDetails.totalCopies = totalCopies;
        orderPriceDetails.totalAmount = totalCopies * (totalBlackWhitePaperCost + totalColorPapersCost);
        return orderPriceDetails;
      }
    }
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
