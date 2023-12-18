import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PassportModule, JwtModule.register({
    secret: 'gocampx-sai',
    signOptions: { expiresIn: '30d' },
  })],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
