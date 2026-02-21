import { Injectable } from '@nestjs/common';
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

  async saveCategory(category: CategoryEntity): Promise<boolean> {
    const categorySchema: Partial<Categories> =
      CategoryMapper.toSchema(category);
    const existedChapter = await this.categoriesModel.findOne({
      chapter: category.chapter,
    });
    if (!existedChapter) {
      await this.categoriesModel.insertOne(categorySchema);
    } else {
      const isExistedLesson = existedChapter.lessons.find(
        (lesson) => lesson.name === category.lessons[0].name,
      );
      if (!isExistedLesson) {
        await this.categoriesModel.updateOne(
          { _id: existedChapter._id },
          { $push: { lessons: categorySchema.lessons!![0] } },
        );
      }
    }
    return true;
  }

  async getAll(): Promise<CategoryEntity[]> {
    const categories = await this.categoriesModel.find();
    const categoriesDomain: CategoryEntity[] = categories.map((category) => {
      return new CategoryEntity({
        id: category.id,
        chapter: category.chapter,
        lessons: category.lessons,
      });
    });

    return categoriesDomain;
  }
}
