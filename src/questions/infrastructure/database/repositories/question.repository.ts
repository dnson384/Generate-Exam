import { Injectable } from '@nestjs/common';
import { QuestionEntity } from 'src/questions/domain/entities/question.entity';
import { IQuestionRepository } from 'src/questions/domain/repositories/question.repository';

import { QuestionMapper } from '../mappers/question.mapper';
import { Questions, QuestionsDocument } from '../schemas/question.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class QuestionRepository implements IQuestionRepository {
  constructor(
    @InjectModel(Questions.name)
    private readonly QuestionModel: Model<QuestionsDocument>,
  ) {}

  async saveQuestions(questions: QuestionEntity[]): Promise<boolean> {
    const questionsSchema: Partial<Questions>[] = questions.map((question) =>
      QuestionMapper.toSchema(question),
    );
    await this.QuestionModel.insertMany(questionsSchema);
    return true;
  }
}
