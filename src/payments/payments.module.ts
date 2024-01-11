import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService],
  imports:[JwtModule]
})
export class PaymentsModule {}
