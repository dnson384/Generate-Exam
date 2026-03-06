import { Injectable } from '@nestjs/common';
import { NewCategoryDTO } from '../dto/category.dto';
import { CategoryEntity } from 'src/categories/domain/entities/category.entity';
import { ICategoriesRepository } from 'src/categories/domain/repositories/category.repository';

@Injectable()
export class CategoriesServices {
  constructor(private readonly repo: ICategoriesRepository) {}

  async insert(
    category: NewCategoryDTO,
  ): Promise<{ chapterId: string; lessonId: string }> {
    const newCategoryEntity = new CategoryEntity({
      subject: category.subject,
      chapter: category.chapter,
      lessons: category.lessons,
    });
    return await this.repo.saveCategory(newCategoryEntity);
  }
}
