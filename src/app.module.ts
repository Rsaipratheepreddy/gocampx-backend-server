import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { VendorModule } from './vendor/vendor.module';
import { OrderModule } from './order/order.module';
import { PaymentsModule } from './payments/payments.module';
import { WalletModule } from './wallet/wallet.module';
import { ServicesModule } from './services/services.module';
import { configService } from './config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollegeModule } from './college/college.module';
import { WalletTransactionsModule } from './wallet-transactions/wallet-transactions.module';

@Module({
  
  imports: [UserModule, VendorModule, OrderModule, PaymentsModule, WalletModule, ServicesModule,TypeOrmModule.forRoot(configService.getTypeOrmConfig()), CollegeModule, WalletTransactionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
