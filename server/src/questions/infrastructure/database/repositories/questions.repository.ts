import { Injectable } from '@nestjs/common';
import {
  LessonPayloadEntity,
  QuestionEntity,
} from 'src/questions/domain/entities/question.entity';
import { IQuestionRepository } from 'src/questions/domain/repositories/question.repository';

import { QuestionMapper } from '../mappers/questions.mapper';
import { Questions, QuestionsDocument } from '../models/questions.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewPracticeDTO } from 'src/practices/application/dtos/practices.dto';
import { PracticesServices } from 'src/practices/application/services/practices.service';

@Injectable()
export class QuestionRepository implements IQuestionRepository {
  constructor(
    @InjectModel(Questions.name)
    private readonly QuestionModel: Model<QuestionsDocument>,
    private readonly practicesService: PracticesServices,
  ) {}

  async saveQuestions(questions: QuestionEntity[]): Promise<boolean> {
    const questionsSchema: Partial<Questions>[] = questions.map((question) =>
      QuestionMapper.toSchema(question),
    );
    await this.QuestionModel.insertMany(questionsSchema);
    return true;
  }

  async getPractice(
    title: string,
    chapter: string,
    lessons: LessonPayloadEntity[],
  ): Promise<any> {
    const fetchPromises = lessons.map(async (lesson) => {
      const condition = {
        chapter: chapter,
        lesson: lesson.name,
        exerciseType: { $in: lesson.exerciseTypes },
        difficultyLevel: { $in: lesson.difficultyLevels },
        learningOutcomes: { $in: lesson.learningOutcomes },
        questionType: { $in: lesson.questionTypes },
      };

      const questions = await this.QuestionModel.aggregate([
        { $match: condition },
        { $sample: { size: lesson.questionsCount } },
      ]);

      return questions;
    });

    const result = await Promise.all(fetchPromises);
    const questions = result.flat();
    const resultDomain: QuestionEntity[] = questions.map((question) =>
      QuestionMapper.toDomain(question),
    );

    const payload: NewPracticeDTO = {
      title: title,
      chapter: chapter,
      questionsCount: resultDomain.length,
      questionsId: resultDomain.map((question) => question.id!.toString()),
    };
    return await this.practicesService.insert(payload);
  }
}
