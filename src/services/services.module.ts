import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';

@Module({
  controllers: [ServicesController],
  providers: [ServicesService],
  imports:[JwtModule, TypeOrmModule.forFeature([ Service])]
})
export class ServicesModule {}
