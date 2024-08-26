import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Public } from 'src/common/decorators';
import { AdminGuard } from 'src/common/guards';
import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Products")
@Controller('products')
export class ProductsController {
  constructor(private readonly productService:ProductsService) {}

  @Public()
  @UseGuards(AdminGuard)
  @Post()
  async create(@Body() createProductDto:CreateProductDto){
    return await this.productService.create(createProductDto)
  }

  @Get()
  async findAll(){
    return await this.productService.findAll()
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id:number){
    return await this.productService.findOne(id)
  }

  @Public()
  @UseGuards(AdminGuard)
  @Patch(":id")
  async update(@Param("id", ParseIntPipe) id:number, @Body() updateProductDto:UpdateProductDto){
    return await this.productService.update(id,updateProductDto)
  }

  @Public()
  @UseGuards(AdminGuard)
  @Delete()
  async delete(@Param("id", ParseIntPipe) id:number){
    return await this.productService.remove(id)
  }
}
