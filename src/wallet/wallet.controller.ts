import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { AuthGuard } from '../user/guards/auth.gaurd';

@Controller('wallet')
@UseGuards(AuthGuard)
export class WalletController {
  constructor(private readonly walletService: WalletService) { }

  @Post("create")
  createWallet(@Body() createWalletDto: CreateWalletDto) {
    return this.walletService.create(createWalletDto);
  }

  @Get(':id')
  findWalletById(@Param('id') id: string) {
    return this.walletService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletService.update(id, updateWalletDto);
  }

  @Get('convertCoinsToMoney/:id')
  convertWalletCoinsToMoney(@Param('id') id: string) {
    return this.walletService.convertWalletCoinsToMoney(id);
  }
}
