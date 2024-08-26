import { AuthGuard } from "@nestjs/passport";

export class AdminGuard extends AuthGuard("swift_jwt_admin") {
    constructor(){
        super();
    }
}