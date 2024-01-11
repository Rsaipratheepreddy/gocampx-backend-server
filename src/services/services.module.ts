import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [ServicesController],
  providers: [ServicesService],
  imports:[JwtModule]
})
export class ServicesModule {}
