import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateCollegeDto } from './dtos/create-college-dto';
import { College } from './entities/college.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, NotFoundException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { UpdateCollegeDto } from './dtos/update-college.dto';

@Injectable()
export class CollegeService {
   constructor(
      @InjectRepository(College) private readonly collegeRepo: Repository<College>,
   ) { }

   async createCollege(createCollegeDto: CreateCollegeDto) {
      try {
         const college = await this.collegeRepo.findOne({ where: { collegeName: createCollegeDto.collegeName } });
         if (college != null) {
            throw new UnprocessableEntityException("College with this name already exists")
         }
         const result = await this.collegeRepo.save(createCollegeDto);
         if (result) {
            return {
               success: true,
               data: result
            }
         }

      } catch (e) {
         throw new HttpException('Error creating college', HttpStatus.BAD_REQUEST);
      }
   }

   async getAllColleges() {
      const colleges = await this.collegeRepo.find({});
      return colleges;
   }

   async update(id: string, updatecollegeDto: UpdateCollegeDto) {
      try {
         const college = await this.collegeRepo.findOneBy({ id })
         if (!college) {
            throw new NotFoundException('Could not find college');
         }

         const updatedCollege = await this.collegeRepo.update(id, updatecollegeDto)
         return {
            success: true
         }

      } catch (e) {
         throw new HttpException('Error updating college', HttpStatus.BAD_REQUEST);
      }
   }

   async deleteCollege(id: string) {
      try {
         const college = await this.collegeRepo.findOneBy({ id })
         if (!college) {
            throw new NotFoundException('Could not find college');
         }
         await this.collegeRepo.delete(id)
         return {
            success: true
         }
      } catch (e) {
         throw new HttpException('Error deleting college', HttpStatus.BAD_REQUEST);
      }
   }
}