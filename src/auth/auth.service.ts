import { ForbiddenException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(private readonly databaseService:DatabaseService, private readonly jwtService:JwtService, private readonly config:ConfigService){}
  async signInLocal(authValidate:AuthDto){
    const user = await this.databaseService.user.findUnique({
      where:{
        email:authValidate.email,
      }
    })
    if(!user) throw new ForbiddenException("Access Denied")
    
    const passMatch = await bcrypt.compare(authValidate.password,user.password)
    if(!passMatch) throw new Error("Access Denied")

    const tokens = await this.getToken(user.id,user.isAdmin)
    await this.updateRtToken(user.id,tokens.refreshToken)
    return tokens
  }
  async logout(id:number){
    await this.databaseService.user.updateMany({
      where:{
        id,
        hashUpdateToken:{
          not:null
        }
      },
      data: {
        hashUpdateToken:null
      }
    }) 
  }
  async refreshToken(id:number, rt:string){
    const user = await this.databaseService.user.findUnique({
      where:{
        id,
      }
    })
    if(!user || !user.hashUpdateToken) throw new ForbiddenException("Access Denied")

    const isValid = await bcrypt.compare(rt, user.hashUpdateToken)
    if(!isValid) throw new ForbiddenException("Access Denied")

    const tokens = await this.getToken(user.id,user.isAdmin)
    await this.updateRtToken(user.id,tokens.refreshToken)
    return tokens
  }

  async getToken(id:number, isAdmin:boolean): Promise<Tokens>{
    const [at,rt] = await Promise.all([
        this.jwtService.signAsync({
            id,
            isAdmin,
        },
        {
            secret: this.config.get("Jwt_private_key"),
            expiresIn: 60 * 15
        }
    ),
    this.jwtService.signAsync({
        id,
        isAdmin,
    },
    {
        secret: this.config.get("Jwt_private_key"),
        expiresIn: 60 * 60 * 24 * 7
    }
)
    ])

    return {
        accessToken: at,
        refreshToken: rt
    }
}
async updateRtToken(id: number, rt: string){
    this.databaseService.user.update({
        where:{
            id,
        },
        data:{hashUpdateToken: rt}
    })
}
}
