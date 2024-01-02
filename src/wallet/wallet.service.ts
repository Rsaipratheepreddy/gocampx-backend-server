import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from './entities/wallet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet) private readonly walletRepository: Repository<Wallet>,
  ) { }

  async create(createWalletDto: CreateWalletDto) {
    try {
      const newWallet = await this.walletRepository.save(createWalletDto)
      return {
        success: true,
        data: newWallet
      }
    } catch (e) {
      throw new HttpException('Error creating wallet', HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string) {
    const wallet = await this.walletRepository.findOneBy({ id })
    if (!wallet) {
      throw new NotFoundException('Could not find wallet');
    }
    return {
      success: true,
      data: wallet
    }
  }

  async update(id: string, updateWalletDto: UpdateWalletDto) {
    try {
      const wallet = await this.walletRepository.findOneBy({ id })
      if (!wallet) {
        throw new NotFoundException('Could not find wallet');
      }
      if (wallet.userId == updateWalletDto.userId) {
        const updatedWallet = await this.walletRepository.update(id, updateWalletDto)
        return {
          success: true
        }
      }
      else {
        throw new Error("Bad request")
      }
    } catch (e) {
      throw new HttpException('Error updating wallet', HttpStatus.BAD_REQUEST);
    }
  }

  async convertWalletCoinsToMoney(id: string) {
    const wallet = await this.walletRepository.findOneBy({ id })
    if (!wallet) {
      throw new NotFoundException('Could not find wallet');
    }
    const coins = wallet.availableCoins + wallet.cashbackCoins
    const money = coins / 10
    return {
      success: true, data: {
        id,
        money,
        coins
      }
    }
  }

}
