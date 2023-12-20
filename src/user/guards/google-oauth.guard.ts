
import {  Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
@Injectable()
export class GoogleOauthGuard extends PassportStrategy(Strategy, 'google') {
    constructor(

        @InjectRepository(User) private userRepository: Repository<User>,
      ) {
        super({
          clientID: "967542080765-uhqfaoeu0f40sv6jurlbr0055el3crjt.apps.googleusercontent.com",
          clientSecret: "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",
          callbackURL: "http://localhost:3000/api/auth/google/callback",
          scope: ['profile', 'email'],
        });
      }

      async validate(
        _accessToken: string,
        _refreshToken: string,
        profile: any,
        done: VerifyCallback,
      ): Promise<any> {
        try {
          const { id, name, emails, photos } = profile;
      
          const user = {
            provider: 'google',
            providerId: id,
            email: emails[0].value,
            name: `${name.givenName} ${name.familyName}`,
            picture: photos[0].value,
          };
          done(null, user);
        } catch (error) {
          done(error);
        }
      }
      
    
}
