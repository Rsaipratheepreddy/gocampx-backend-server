import { Module } from '@nestjs/common';
import { CollegeService } from './college.service';
import { CollegeController } from './college.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { College } from './entities/college.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([College]), JwtModule],
  controllers: [CollegeController],
  providers: [CollegeService],
})
export class CollegeModule {}
