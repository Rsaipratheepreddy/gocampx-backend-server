import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Otp } from './entities/otp.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([User, Otp]), PassportModule, JwtModule.register({
    secret: 'gocampx-sai',
    signOptions: { expiresIn: '1d' },
  }), HttpModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }
