import { Categories, CategoriesDocument } from '../schemas/category.schemas';
import { CategoryEntity } from 'src/categories/domain/entities/category.entity';

export class CategoryMapper {
  static toDomain(raw: CategoriesDocument): CategoryEntity {
    return new CategoryEntity({
      id: raw._id.toString(),
      chapter: raw.chapter,
      lessons: raw.lessons,
    });
  }

  static toSchema(entity: CategoryEntity): Partial<Categories> {
    return {
      chapter: entity.chapter,
      lessons: entity.lessons,
    };
  }
}
