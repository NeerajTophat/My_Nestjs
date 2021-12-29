import { Injectable , UnauthorizedException} from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt';
// import {Strategy} from "@nest/passport-local";
import { InjectModel } from '@nestjs/mongoose'


import { User } from './user.model'
import { Model } from 'mongoose'
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from './jwt-payload.interface';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
 constructor( @InjectModel('user') private readonly userModel: Model<User> ) {
    super({
      secretOrKey: 'secret',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload ){
    const userName  = payload.userName;
    const user = await this.userModel.findOne({ userName });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
