import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  

  //
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Post("login")
  async loginUser(@Body() loginUserDto: LoginUserDto)  {
    return await this.userService.loginUser(loginUserDto);
  }
  
  @Post()
  async generateOtp(){
     
  }

  @Post()
  async verifyOtp(){}

  @Get()
  async getUserReferrals(){}

  


}
