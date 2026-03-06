import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICategoriesRepository } from 'src/categories/domain/repositories/category.repository';
import { Categories, CategoriesDocument } from '../schemas/category.schemas';
import { CategoryMapper } from '../mappers/category.mapper';
import { CategoryEntity } from 'src/categories/domain/entities/category.entity';

@Injectable()
export class CategoriesRepository implements ICategoriesRepository {
  constructor(
    @InjectModel(Categories.name)
    private readonly categoriesModel: Model<CategoriesDocument>,
  ) {}

  async saveCategory(
    category: CategoryEntity,
  ): Promise<{ chapterId: string; lessonId: string }> {
    const categorySchema: Partial<Categories> =
      CategoryMapper.toSchema(category);

    const existedChapter = await this.categoriesModel.findOne({
      chapter: category.chapter,
    });

    if (!existedChapter) {
      const created = await this.categoriesModel.create(categorySchema);

      return {
        chapterId: created._id.toString(),
        lessonId: created.lessons[0]._id.toString(),
      };
    }

    const isExistedLesson = existedChapter.lessons.some(
      (lesson) => lesson.name === category.lessons[0].name,
    );
    if (isExistedLesson) {
      existedChapter.lessons.push(categorySchema.lessons!![0]);
      await existedChapter.save();
    }
    return {
      chapterId: existedChapter._id.toString(),
      lessonId:
        existedChapter.lessons[
          existedChapter.lessons.length - 1
        ]._id.toString(),
    };
  }

  async getAll(): Promise<CategoryEntity[]> {
    const categories = await this.categoriesModel.find();
    const categoriesDomain: CategoryEntity[] = categories.map((category) => {
      return CategoryMapper.toDomain(category);
    });

    return categoriesDomain;
  }

  async getById(cateId: string): Promise<CategoryEntity> {
    const category = await this.categoriesModel.findById(cateId);

    if (!category) throw new NotFoundException('Không tồn tại chương này');

    const categoryDomain = CategoryMapper.toDomain(category);
    return categoryDomain;
  }
}
