import { Injectable } from '@nestjs/common';
import { NewCategoryDTO } from './dto/category.dto';
import { CategoryEntity } from '../domain/entities/category.entity';
import { ICategoriesRepository } from '../domain/repositories/category.repository';

@Injectable()
export class CategoriesUseCase {
  constructor(private readonly repo: ICategoriesRepository) {}

  async insert(category: NewCategoryDTO): Promise<boolean> {
    const newCategoryEntity = new CategoryEntity({
      chapter: category.chapter,
      lessons: category.lessons,
    });
    return await this.repo.saveCategory(newCategoryEntity);
  }
}
