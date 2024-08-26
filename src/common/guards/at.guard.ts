import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";

@Injectable() //Means that you can inject anything in this class
export class AtGuard extends AuthGuard("swift_jwt") {
    constructor(private readonly reflactor:Reflector){
        super();
    }
    canActivate(context:ExecutionContext){ // The reflactor object is used to retrieve a certain metadata added to a class
        const isPublic = this.reflactor.getAllAndOverride("isPublic",[
            context.getHandler(), //This parameter provides details about the current request being processed, including the controller and handler (method) handling the request.
            context.getClass() //Checks for both the handler and class
        ])
        if(isPublic) return true; //Can activate means that if true it allows access to everyone if not continues with the super fn

        return super.canActivate(context)
    }
}