import { Module } from '@nestjs/common';
import { QuestionsController } from './presentation/questions.controller';
import { QuestionsUseCase } from './application/questions.usecase';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Questions,
  QuestionsSchema,
} from './infrastructure/database/models/questions.model';
import { IQuestionRepository } from './domain/repositories/question.repository';
import { QuestionRepository } from './infrastructure/database/repositories/questions.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Questions.name, schema: QuestionsSchema },
    ]),
  ],
  controllers: [QuestionsController],
  providers: [
    QuestionsUseCase,
    { provide: IQuestionRepository, useClass: QuestionRepository },
  ],
})
export class DocumentModule {}
