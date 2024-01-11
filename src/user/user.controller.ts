import { Controller, Post, Body, Req, Res, UseGuards, Get, BadRequestException, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-dto';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { CreateOtpDto } from './dto/create-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { AuthGuard } from './guards/auth.gaurd';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  private apiUrl = 'https://api.smscountry.com/';
  private apiKey = "XbCnyTHRvDd8H0VVf328 ANd";
  private authToken = "ru87gy00H7n31Djb4az0IAw1u2kWO4gEgXIONIRL";

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async auth() { }


  @Post("signUp")
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Post("login")
  async loginUser(@Body() loginUserDto: LoginUserDto, @Req() req) {
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

  @UseGuards(AuthGuard)
  @Get('getUserReferrals/:id')
  async getUserReferrals(@Param('id') id: string) {
    return this.userService.findReferrals(id)
  }

  @UseGuards(AuthGuard)
  @Get('get/:id')
  getUser(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post("resetPassword")
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return await this.userService.resetPassword(resetPasswordDto)
  }

  @Post("updatePassword")
  async updatePassword(@Body() updatePasswordDto: UpdatePasswordDto) {
    return await this.userService.updatePassword(updatePasswordDto)
  }


}
