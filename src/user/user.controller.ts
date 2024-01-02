import { Controller, Post, Body, Req, Res, UseGuards, Get, BadRequestException } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-dto';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { CreateOtpDto } from './dto/create-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  private apiUrl = 'https://api.smscountry.com/';
  private apiKey = "XbCnyTHRvDd8H0VVf328 ANd";
  private authToken = "ru87gy00H7n31Djb4az0IAw1u2kWO4gEgXIONIRL";

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async auth() { }


  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Post("login")
  async loginUser(@Body() loginUserDto: LoginUserDto, @Req() req, @Res() res: Response) {
    try {

      if (req.headers['authorization'] && req.headers['authorization'].startsWith('Bearer ')) {
        const googleUser = req.user;
        if (!googleUser) throw new BadRequestException("Unauthorized")
        return await this.userService.loginUser(loginUserDto, googleUser.email);

      }

      return await this.userService.loginUser(loginUserDto, "");

    } catch (e) {
      throw new BadRequestException("Unauthorized");
    }
  }

  @Post("sendMobileOtp")
  async sendMobileOtp(@Body() createOtpDto: CreateOtpDto) {
    return await this.userService.sendOtp(createOtpDto)
  }

  @Post("verifyOtp")
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return await this.userService.verifyOtp(verifyOtpDto)
  }

  @Get()
  async getUserReferrals(){}

  


}
