import { CategoryEntity } from '../entities/category.entity';

export abstract class ICategoriesRepository {
  abstract saveCategory(
    category: CategoryEntity,
  ): Promise<{ chapterId: string; lessonId: string }>;
  abstract getAll(): Promise<CategoryEntity[]>;
}
