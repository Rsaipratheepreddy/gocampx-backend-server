import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vendor } from './entities/vendor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VendorService {

  constructor(
    @InjectRepository(Vendor) private readonly vendorRepository: Repository<Vendor>,
  ) { }

  async create(createVendorDto: CreateVendorDto) {
    try {
      const newVendor = await this.vendorRepository.save(createVendorDto)
      return {
        success: true,
        data: newVendor
      }
    } catch (e) {
      throw new HttpException('Error creating vendor', HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    return `This action returns all vendor`;
  }

  async findOne(id: string) {
    const vendor = await this.vendorRepository.findOneBy({ id })
    if (!vendor) {
      throw new NotFoundException('Could not find vendor');
    }
    return {
      success: true,
      data: vendor
    }
  }

  async update(id: string, updateVendorDto: UpdateVendorDto) {
    try {
      const vendor = await this.vendorRepository.findOneBy({ id })
      if (!vendor) {
        throw new NotFoundException('Could not find vendor');
      }
      await this.vendorRepository.update(id, updateVendorDto)
      return {
        success: true
      }

    } catch (e) {
      throw new HttpException('Error updating service', HttpStatus.BAD_REQUEST);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} vendor`;
  }
}
