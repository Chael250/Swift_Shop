import { ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt"

@Injectable()
export class AdminStrategy extends PassportStrategy(Strategy, "swift_jwt_admin") {
    constructor(private readonly config:ConfigService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get("JWT_PRIVATE_KEY"),
            passReqToCallback: true //lets us to use the refresh token e
        })
    }

    validate(req:Request,payload:any){ //This validate fn will set the req.user
       if(payload.isAdmin) return payload;
        throw new ForbiddenException("Access Denied")
    }
}