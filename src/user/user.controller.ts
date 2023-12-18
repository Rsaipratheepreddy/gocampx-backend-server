import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Post()
  async createUser(@Body() createUserDto: any) {
    return await this.userService.create(createUserDto);
  }

  @Post()
  async loginUser()  {
    return await this.userService.findAll();
  }
  
  @Post()
  async generateOtp(){
     
  }

  @Post()
  async verifyOtp(){}

  @Get()
  async getUserReferrals(){}

  


}
