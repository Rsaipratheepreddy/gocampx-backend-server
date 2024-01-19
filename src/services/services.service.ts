import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { Repository } from 'typeorm';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {

  constructor(
    @InjectRepository(Service) private readonly serviceRepository: Repository<Service>,
  ) { }

  async create(createServiceDto: CreateServiceDto) {
    try {
      const newService = await this.serviceRepository.save(createServiceDto)
      return {
        success: true,
        data: newService
      }
    } catch (e) {
      console.log(e)
      throw new HttpException('Error creating service', HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    return `This action returns all services`;
  }

  async findOne(id: string) {
    const service = await this.serviceRepository.findOneBy({ id })
    if (!service) {
      throw new NotFoundException('Could not find service');
    }
    return {
      success: true,
      data: service
    }
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    try {
      const wallet = await this.serviceRepository.findOneBy({ id })
      if (!wallet) {
        throw new NotFoundException('Could not find service');
      }
      await this.serviceRepository.update(id, updateServiceDto)
      return {
        success: true
      }

    } catch (e) {
      throw new HttpException('Error updating service', HttpStatus.BAD_REQUEST);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
