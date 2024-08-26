import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserDto {
    @ApiProperty({
        description: "Firstname is string and not null",
        example: "user_firstname"
    })
    @IsString()
    @IsNotEmpty()
    firstName: string

    @ApiProperty({
        description: "Lastname is string and not null",
        example: "user_lastname"
    })
    @IsString()
    @IsNotEmpty()
    lastName: string

    @ApiProperty({
        description: "Email is string and not null",
        example: "user_email@gmail.com"
    })
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty({
        description: "Name is string and not null",
        example: "product_name"
    })
    @IsString()
    @IsNotEmpty()
    tel: string

    @ApiProperty({
        description: "Password is string and not null",
        example: "user_password"
    })
    @IsString()
    @IsNotEmpty()
    password: string

}

export class UpdateUserDto extends PartialType(UserDto) {}