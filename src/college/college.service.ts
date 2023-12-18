import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateCollegeDto } from './dtos/create-college-dto';
import { College } from './entities/college.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CollegeService {
   constructor(
    @InjectRepository(College) private readonly collegeRepo: Repository<College>,
   ){}

    async createCollege(createCollegeDto: CreateCollegeDto) {
        const college = await this.collegeRepo.findOne({where: {collegeName: createCollegeDto.collegeName}});
        if(college == null){
            throw new UnprocessableEntityException("College with this name already exists")
        } 
        
        const newCollege: College = new College();
         
         newCollege.collegeName = createCollegeDto.collegeName
         newCollege.address = createCollegeDto.address
         newCollege.locationUrl = createCollegeDto.locationUrl

         const result = await this.collegeRepo.save(newCollege);

         if(result == null){
            throw new UnprocessableEntityException("Unable to create College");
         }
         
         return {
            status: 0,
            message: "Successfully created"
         }

    }

    async getAllColleges(){
       const colleges = await this.collegeRepo.find({});
       return colleges;
    }

    // add delete
}
