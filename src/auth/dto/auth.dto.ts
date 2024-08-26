import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthDto {
    @ApiProperty({
        description: "Email is an email and not null",
        example: "user_email@gmail.com"
    })
    @IsEmail()
    @IsNotEmpty()
    email:string

    @ApiProperty({
        description: "Password is string and not null",
        example: "user_password"
    })
    @IsString()
    @IsNotEmpty()
    password:string
}