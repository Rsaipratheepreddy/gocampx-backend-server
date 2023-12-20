import { BadRequestException, Injectable, NotAcceptableException, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { createHash } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService
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
      // if (referredUser != null) {
      //   user.referredBy = referredUser.id;
      // }
      // user.referredBy = referredUser.id;

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
    if(email !=null){
      const user = await this.userRepository.findOne({ where: { email: email } });
      if(!user) throw new BadRequestException("User Not Found");
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





}
