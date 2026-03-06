import { Injectable } from '@nestjs/common';
import { CategoriesResponseDTO } from './dto/category.dto';
import { ICategoriesRepository } from '../domain/repositories/category.repository';

@Injectable()
export class CategoriesUseCase {
  constructor(private readonly repo: ICategoriesRepository) {}

  async getAll(): Promise<CategoriesResponseDTO[]> {
    const categoriesDomain = await this.repo.getAll();
    const categoriesDTO: CategoriesResponseDTO[] = categoriesDomain.map(
      (category) => ({
        id: category.id!,
        subject: category.subject,
        chapter: category.chapter,
        lessons: category.lessons.map((lesson) => ({
          id: lesson.id!,
          name: lesson.name,
          exerciseTypes: lesson.exerciseTypes,
          difficultyLevels: lesson.difficultyLevels,
          learningOutcomes: lesson.learningOutcomes,
          questionTypes: lesson.questionTypes,
        })),
      }),
    );
    return categoriesDTO;
  }
}
