import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
    @ApiProperty({
        description: "Name is string and not null",
        example: "product_name"
    })
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({
        description: "Description is string and not null",
        example: "product_description"
    })
    @IsString()
    @IsNotEmpty()
    description: string

    @ApiProperty({
        description: "Price is string and not null",
        example: "product_price"
    })
    @IsDecimal()
    @IsNotEmpty()
    price: number

    @ApiProperty({
        description: "ID is number and not null",
        example: "product_category_id"
    })
    @IsNumber()
    @IsNotEmpty()
    categoryId: number
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
