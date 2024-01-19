import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { BindingOrderPriceDetails, CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { BindingOrderDetailsDto } from './dto/order-details.dto';
import { Service } from 'src/services/entities/service.entity';
import { BindingPriceConfig } from 'src/services/dto/service-price-details';
import { create } from 'domain';
import { Vendor } from '../vendor/entities/vendor.entity';
import { OrderStatus } from '../helper/enums';
import { sendMsgToUserMobile } from '../helper/sendMsgToMobile';
import { Wallet } from '../wallet/entities/wallet.entity';
import { CreateWalletDto } from 'src/wallet/dto/create-wallet.dto';

@Injectable()
export class OrderService {

  constructor(
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Service) private readonly serviceRepo: Repository<Service>,
    @InjectRepository(Vendor) private readonly vendorRepository: Repository<Vendor>,
    private dataSource: DataSource
  ) { }
  async createOrder(createOrderDto: CreateOrderDto) {

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      let points = 0
      const user = await this.userRepository.findOne({ where: { id: createOrderDto.userId } })
      if (user == null) {
        return new UnprocessableEntityException("User not found")
      }
      createOrderDto.orderStatus = OrderStatus.PLACED;
      const order = await this.orderRepository.findOneBy({ userId: createOrderDto.userId })
      let wallet = user.wallet
      let referredUser = null
      let referredUserWallet = null
      if (user.referredBy) {
        referredUser = await this.userRepository.findOneBy({ referralId: user.referredBy })
        referredUserWallet = referredUser && referredUser.wallet
      }
      const priceDetails = await this.getPriceDetails(createOrderDto.orderDetails, createOrderDto.serviceId)
      console.log(priceDetails)

      if (order) {
        if (!referredUser) {
          if (priceDetails.totalAmount >= 150)
            points = 6
        } else {
          points = 8
        }
      } else {
        if (referredUser) {
          if (priceDetails.totalAmount >= 899)
            points = 8
        } else {
          points = 8
        }
      }
      if (wallet) {
        wallet.cashbackCoins = wallet.cashbackCoins + points
      } else {
        wallet = {} as Wallet
        wallet.availableCoins = 0
        wallet.userId = createOrderDto.userId
        wallet.cashbackCoins = points
        wallet.redeemedCoins = 0
      }
      if (referredUser) {
        if (referredUserWallet) {
          referredUserWallet.cashbackCoins = referredUserWallet.cashbackCoins + points
        } else {
          referredUserWallet = {} as Wallet
          referredUserWallet.availableCoins = 0
          referredUserWallet.userId = referredUser.id
          referredUserWallet.cashbackCoins = points
          referredUserWallet.redeemedCoins = 0
        }
        await queryRunner.manager.upsert(Wallet, referredUserWallet, { conflictPaths: ["userId"] })
      }

      await queryRunner.manager.upsert(Wallet, wallet, { conflictPaths: ["userId"] })

      const result = await queryRunner.manager.save(Order, createOrderDto);

      await sendMsgToUserMobile("your order is placed", user.mobileNo)

      await queryRunner.commitTransaction();

      return result;
    } catch (e) {

      await queryRunner.rollbackTransaction();
      throw new UnprocessableEntityException();

    } finally {
      await queryRunner.release();
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
    const updatedOrder = await this.orderRepository.save(order);
    return updatedOrder;
  }

  async getAllOrders() {
    return await this.orderRepository.find();
  }

  async getOrderByServiceType(serviceId: string) {
    const orders = await this.orderRepository.find({ where: { serviceId: serviceId } });
    return
  }

  async changeOrderStatus(orderStatus: OrderStatus, orderId: string) {

    const order = await this.orderRepository.findOne({ where: { id: orderId } });
    if (!order) {
      throw new UnprocessableEntityException('Order not found');
    }
    const user = await this.userRepository.findOne({ where: { id: order.userId } })
    const updatedOrder = await this.orderRepository.update(orderId, { orderStatus })
    await sendMsgToUserMobile(`your order is ${orderStatus}`, user.mobileNo)
    return {
      success: true,
      data: updatedOrder
    }
  }

  async getPriceDetails(orderDetails: BindingOrderDetailsDto[], serviceId: string) {
    const service = await this.serviceRepo.findOneBy({ id: serviceId })
    switch (service.type) {
      case 'binding': {
        const priceConfig = service.priceConfig as BindingPriceConfig;
        const serviceOrderDetails: BindingOrderDetailsDto[] = orderDetails;
        const orderPriceDetails = new BindingOrderPriceDetails()
        let totalBlackWhitePaperCost = 0;
        let totalColorPapersCost = 0;
        let totalCopies = 0
        for (const item of serviceOrderDetails) {
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
    return {} as BindingOrderPriceDetails;
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
