import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService],
  imports: [HttpModule, JwtModule]
})
export class PaymentsModule {}
