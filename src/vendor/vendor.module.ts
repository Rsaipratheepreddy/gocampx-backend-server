import { Module } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { VendorController } from './vendor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vendor } from './entities/vendor.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [VendorController],
  providers: [VendorService],
  imports:[TypeOrmModule.forFeature([Vendor]), JwtModule]
})
export class VendorModule {}
