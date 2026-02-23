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
import { QuestionsServices } from './application/services/questions.services';
import { PracticesModule } from 'src/practices/practices.module';

@Module({
  imports: [
    PracticesModule,
    MongooseModule.forFeature([
      { name: Questions.name, schema: QuestionsSchema },
    ]),
  ],
  controllers: [QuestionsController],
  providers: [
    QuestionsServices,
    QuestionsUseCase,
    { provide: IQuestionRepository, useClass: QuestionRepository },
  ],
  exports: [QuestionsServices],
})
export class QuestionsModule {}
