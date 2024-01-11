import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './entities/wallet.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [WalletController],
  providers: [WalletService],
  imports: [TypeOrmModule.forFeature([Wallet]), JwtModule],
})
export class WalletModule {}
