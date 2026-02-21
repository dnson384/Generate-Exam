import { Injectable } from '@nestjs/common';
import { CategoriesResponseDTO, NewCategoryDTO } from './dto/category.dto';
import { CategoryEntity } from '../domain/entities/category.entity';
import { ICategoriesRepository } from '../domain/repositories/category.repository';

@Injectable()
export class CategoriesUseCase {
  constructor(private readonly repo: ICategoriesRepository) {}

  async getAll(): Promise<CategoriesResponseDTO[]> {
    const categoriesDomain = await this.repo.getAll();
    const categoriesDTO: CategoriesResponseDTO[] = categoriesDomain.map(
      (category) => ({
        id: category.id!,
        chapter: category.chapter,
        lessons: category.lessons,
      }),
    );
    return categoriesDTO;
  }
}
