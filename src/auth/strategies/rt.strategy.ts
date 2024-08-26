import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt"

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, "swift_jwt_refresh") {
    constructor(private readonly config:ConfigService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get("JWT_PRIVATE_KEY"),
            passReqToCallback: true //lets us to use the refresh token in the req object
        })
    }
    validate(req:Request,payload:any){ //This validate fn will set the req.user
        const refreshToken = req.get("authorization").replace("Bearer", '').trim()
        return {
            ...payload,
            refreshToken
        }
    }
}