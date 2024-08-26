import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly databaseService:DatabaseService){}
  create(createProductDto: CreateProductDto) {
    return this.databaseService.product.create({
      data: createProductDto
    })
  }

  findAll() {
    return this.databaseService.product.findMany()
  }

  findOne(id: number) {
    return this.databaseService.product.findUnique({
      where:{
        id,
      }
    })
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.databaseService.product.update({
      where:{
        id,
      },
      data:updateProductDto
    })
  }

  remove(id: number) {
    return this.databaseService.product.delete({
      where:{
        id,
      }
    })
  }
}
