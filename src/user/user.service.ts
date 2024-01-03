import { BadRequestException, HttpException, Injectable, NotAcceptableException, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { createHash } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-dto';
import { HttpService } from '@nestjs/axios';
import * as otpGenerator from 'otp-generator';
import { Otp } from './entities/otp.entity';
import { CreateOtpDto } from './dto/create-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Otp) private readonly otpRepository: Repository<Otp>,
    private jwtService: JwtService,
    private readonly httpService: HttpService,
  ) { }


  async createUser(createUserDto: CreateUserDto) {
    try {
      const user: User = new User();

      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      // const referredUser = await this.userRepository.findOne({where: {referredBy: createUserDto.referredBy}});

      const referralId = await this.generateReferralId(createUserDto.userName, createUserDto.mobileNo)

      // TODO: optional


      user.authType = createUserDto.authType
      user.firstName = createUserDto.firstName
      user.lastName = createUserDto.lastName
      user.email = createUserDto.email
      user.password = hashedPassword
      user.collegeId = createUserDto.collegeId
      user.referralId = referralId
      user.userName = createUserDto.userName
      user.mobileNo = createUserDto.mobileNo
      user.referredBy = createUserDto.referredBy

      const registeredUser = this.userRepository.save(user);

      if (registeredUser != null) {
        return {
          status: 0,
          message: "success",
          userData: registeredUser
        }
      }
    } catch (error) {
      throw new UnprocessableEntityException("Error while processing");
    }
  }

  TOdo
  async loginUser(loginUserDto: LoginUserDto, email: string) {
    const user = await this.validateUser(loginUserDto.userName, loginUserDto.password, email);

    if (user != null) {
      const { password, ...userWithoutPassword } = user;
      const payload = { ...userWithoutPassword };
      return {
        access_token: this.jwtService.sign(payload),
      }
    }
  }

  async checkUserName(userName: string) {
    const user = await this.userRepository.findOne({ where: { userName: userName } })
    if (user != null) {
      return {
        status: 1,
        message: "user with this name already exists"
      }
    }
    return {
      status: 0,
      message: "available"
    }
  }

  private generateReferralId(username: string, mobile: number): string {
    const dataToHash = `${username}${mobile}`;
    const hashedData = createHash('sha256').update(dataToHash).digest('hex');
    return hashedData.slice(0, 6);
  }

  async validateUser(username: string, password: string, email: string): Promise<any> {
    if (email != null) {
      const user = await this.userRepository.findOne({ where: { email: email } });
      if (!user) throw new BadRequestException("User Not Found");
      return user;
    }
    const user = await this.userRepository.findOne({ where: { userName: username } });
    if (!user) return null;
    const passwordValid = await bcrypt.compare(password, user.password)
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    if (user && passwordValid) {
      return user;
    }
    return null;
  }

  async sendOtp(createOtpDto: CreateOtpDto) {
    try {
      const userDetails = await this.userRepository.findOneBy({ id: createOtpDto.userId })
      if (!userDetails) {
        throw new NotFoundException('Could not find User');
      }
      const otpDetails = await this.otpRepository.findOneBy({ userId: createOtpDto.userId })
      const otp = this.generateOtp()
      if (!otpDetails) {
        const otpObj = {
          ...createOtpDto,
          otp
        }
        await this.otpRepository.save(otpObj)
      } else {
        const otpObj = {
          ...otpDetails,
          otp
        }
        await this.otpRepository.update(otpDetails.id, otpObj)
      }
      const response = await this.sendOtpToUserMobile(otp, userDetails.mobileNo)
      if (response.data.Success) {
        return {
          success: true,
          message: "OTP sent successfully"
        }
      }
      else {
        return {
          success: false,
          message: "Failed to send OTP"
        }
      }
    } catch (e) {
      throw new HttpException("couldn't send Otp", e);
    }
  }

  async verifyOtp(verifyOtpDTO: VerifyOtpDto) {
    try {
      const otpDetails = await this.otpRepository.findOneBy({ userId: verifyOtpDTO.userId })
      if (otpDetails.otp == verifyOtpDTO.otp) {
        const userDetails = await this.userRepository.findOneBy({ id: verifyOtpDTO.userId })
        userDetails.isMobileVerified = true
        await this.userRepository.update(userDetails.id, userDetails)
        return {
          success: true,
          message: "OTP verified successfully"
        }
      } else {
        return {
          success: false,
          message: "Incorrect OTP"
        }
      }
    } catch (e) {
      throw new HttpException("couldn't verify otp", e);
    }
  }

  generateOtp() {
    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false })
    return otp
  }

  async sendOtpToUserMobile(otp: number, mobileNo: number) {
    const url = process.env.SMS_COUNTRY_URL
    const body = {
      "Text": `login OTP is ${otp} - ${process.env.SENDER_ID}`,
      "Number": `91${mobileNo}`,
      "SenderId": process.env.SENDER_ID,
      "DRNotifyUrl": "https://www.domainname.com/notifyurl",
      "DRNotifyHttpMethod": "POST",
      "Tool": "API"
    }
    const bufferObj = Buffer.from(`${process.env.SMS_COUNTRY_AUTH_KEY}:${process.env.SMS_COUNTRY_AUTH_TOKEN}`, "utf8");
    const base64String = bufferObj.toString("base64");
    const headers = {
      "Authorization": `Basic ${base64String}`
    }
    return await this.httpService.axiosRef.post(url, body, { headers });
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id })
    if (!user) {
      throw new NotFoundException('Could not find user');
    }
    return {
      success: true,
      data: user
    }
  }

  async findReferrals(id: string) {
    const user = await this.userRepository.findOneBy({ id })
    if (!user) {
      throw new NotFoundException('Could not find user');
    }
    const referrals = await this.userRepository.find({ where: { referredBy: user.referralId } })
    return {
      success: true,
      data: referrals
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    let user = await this.validateUser(resetPasswordDto.userName, resetPasswordDto.oldPassword, null);
    if (user) {
      const hashedPassword = await bcrypt.hash(resetPasswordDto.newPassword, 10);
      user = {
        ...user,
        password: hashedPassword
      }
      user = await this.userRepository.update(user.id, user)
      if (user) {
        return {
          success: true,
          message: 'Password changed succesfully'
        }
      }

    } else {
      return {
        success: false,
        message: 'Invalid credentials'
      }
    }
  }

  async updatePassword(updatePasswordDto: UpdatePasswordDto) {

    const userDetails = await this.userRepository.findOneBy({ id: updatePasswordDto.userId });
    if (!userDetails) throw new BadRequestException("User Not Found");
    const hashedPassword = await bcrypt.hash(updatePasswordDto.newPassword, 10);
    const user = await this.userRepository.update(updatePasswordDto.userId, { password: hashedPassword })
    if (user) {
      return {
        success: true,
        message: "password updated succesfully"
      }
    } else {
      return {
        success: false,
        message: "couldn't update password"
      }
    }
  }

}
