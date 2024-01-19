import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { AdminGuard } from '../user/guards/admin.gaurd';

@UseGuards(AdminGuard)
@Controller('vendor')
export class VendorController {
  constructor(private readonly vendorService: VendorService) { }

  @Post('create')
  create(@Body() createVendorDto: CreateVendorDto) {
    return this.vendorService.create(createVendorDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vendorService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateVendorDto: UpdateVendorDto) {
    return this.vendorService.update(id, updateVendorDto);
  }
}
