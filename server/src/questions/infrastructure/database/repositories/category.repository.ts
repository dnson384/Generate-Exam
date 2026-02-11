import { Injectable } from '@nestjs/common';
import { QuestionEntity } from 'src/questions/domain/entities/question.entity';

import { QuestionMapper } from '../mappers/question.mapper';
import { Questions, QuestionsDocument } from '../schemas/question.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICategoriesRepository } from 'src/questions/domain/repositories/category.repository';
import { Categories, CategoriesDocument } from '../schemas/category.model';
import { CategoryMapper } from '../mappers/category.mapper';
import { CategoryEntity } from 'src/questions/domain/entities/category.entity';

@Injectable()
export class CategoriesRepository implements ICategoriesRepository {
  constructor(
    @InjectModel(Categories.name)
    private readonly CategoriesModel: Model<CategoriesDocument>,
  ) {}

  async saveCategory(category: CategoryEntity): Promise<boolean> {
    const categorySchema: Partial<Categories> =
      CategoryMapper.toSchema(category);
    const existedChapter = await this.CategoriesModel.findOne({
      chapter: category.chapter,
    });
    if (!existedChapter) {
      await this.CategoriesModel.insertOne(categorySchema);
    } else {
      const isExistedLesson = existedChapter.lessons.find(
        (lesson) => lesson.name === category.lessons[0].name,
      );
      if (!isExistedLesson) {
        await this.CategoriesModel.updateOne(
          { _id: existedChapter._id },
          { $push: {lessons: categorySchema.lessons!![0]} },
        );
      }
    }
    return true;
  }
}
