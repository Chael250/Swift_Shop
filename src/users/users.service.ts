import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Tokens } from 'src/auth/types';
import { UpdateUserDto, UserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
    private readonly salt = 10
    constructor(private readonly databaseService:DatabaseService, private readonly jwtService:JwtService, private readonly config:ConfigService){}

    async create(userDto: UserDto):Promise<Tokens>{
        userDto.password = await bcrypt.hash(userDto.password,this.salt)
        const newUser = await this.databaseService.user.create({
            data: userDto
        })
        const tokens = await this.getToken(newUser.id, newUser.isAdmin)
        await bcrypt.hash(tokens.refreshToken,this.salt)
        await this.updateRtToken(newUser.id,tokens.refreshToken)
        return tokens
    }

    findAll(isAdmin: Boolean){
        if (isAdmin){
            return this.databaseService.user.findMany({
                where:{
                    isAdmin: true
                }
            })
        }
        return this.databaseService.user.findMany()
    }

    findOne(id:number){
        return this.databaseService.user.findUnique({
            where:{
                id
            }
        })
    }

    update(id:number, userDto: UpdateUserDto){
        return this.databaseService.user.update({
            where:{
                id,
            },
            data: userDto
        })
    }

    delete(id:number){
        return this.databaseService.user.delete({
            where:{
                id,
            }
        })
    }

    async getToken(id:number, isAdmin:boolean): Promise<Tokens>{
        const [at,rt] = await Promise.all([
            this.jwtService.signAsync({
                id,
                isAdmin,
            },
            {
                secret: this.config.get("JWT_PRIVATE_KEY"),
                expiresIn: 60 * 15
            }
        ),
        this.jwtService.signAsync({
            id,
            isAdmin,
        },
        {
            secret: this.config.get("JWT_PRIVATE_KEY"),
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
        await this.databaseService.user.update({
            where:{
                id,
            },
            data:{hashUpdateToken: rt}
        })
    }
}
