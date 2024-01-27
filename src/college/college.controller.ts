import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CollegeService } from './college.service';
import { CreateCollegeDto } from './dtos/create-college-dto';
import { UpdateCollegeDto } from './dtos/update-college.dto';
import { AdminGuard } from '../user/guards/admin.gaurd';

@Controller('college')
@UseGuards(AdminGuard)
export class CollegeController {
  constructor(private readonly collegeService: CollegeService) { }

  @Post("create")
  createCollege(@Body() createcollegeDto: CreateCollegeDto) {
    return this.collegeService.createCollege(createcollegeDto);
  }

  @Get()
  findAllColleges() {
    return this.collegeService.getAllColleges();
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updatecollegeDto: UpdateCollegeDto) {
    return this.collegeService.update(id, updatecollegeDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.collegeService.deleteCollege(id);
  }

}
