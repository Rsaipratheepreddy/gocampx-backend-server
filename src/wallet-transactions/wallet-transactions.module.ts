import { Module } from '@nestjs/common';
import { WalletTransactionsService } from './wallet-transactions.service';
import { WalletTransactionsController } from './wallet-transactions.controller';

@Module({
  controllers: [WalletTransactionsController],
  providers: [WalletTransactionsService],
})
export class WalletTransactionsModule {}
