import { AuthGuard } from "@nestjs/passport";

export class RtGuard extends AuthGuard("swift_jwt_refresh") {
    constructor(){
        super();
    }
}