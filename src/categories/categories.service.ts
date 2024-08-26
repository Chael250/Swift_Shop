import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CategoryDto, UpdateCategoryDto } from './dto/category.dto';

@Injectable()
export class CategoriesService {
 constructor(private readonly databaseService:DatabaseService) {}

 create(categoryCreate:CategoryDto){
  return this.databaseService.category.create({
    data:categoryCreate
  })
 }

 findAll(){
  return this.databaseService.category.findMany()
 }

 findOne(id:number){
  return this.databaseService.category.findUnique({
    where:{
      id
    }
  })
 }

 update(id:number, categoryUpdate:UpdateCategoryDto){
  return this.databaseService.category.update({
    where:{
      id,
    },
    data: categoryUpdate
  })
 }

 delete(id:number){
  return this.databaseService.category.delete({
    where:{
      id,
    }
  })
 }
}
