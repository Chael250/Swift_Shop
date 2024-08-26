import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CategoryDto{
    @ApiProperty({
        description: "Name is string and not null",
        example: "category_name"
    })
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({
        description: "Description is string and not null",
        example: "category_description"
    })
    @IsString()
    @IsNotEmpty()
    description: string
}

export class UpdateCategoryDto extends PartialType(CategoryDto){}