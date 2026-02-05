import { Module } from '@nestjs/common';
import { DocumentController } from './presentation/documents.controller';
import { DocumentService } from './application/importDocx.usecase';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Questions,
  QuestionsSchema,
} from './infrastructure/database/schemas/question.model';
import { IQuestionRepository } from './domain/repositories/question.repository';
import { QuestionRepository } from './infrastructure/database/repositories/question.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Questions.name, schema: QuestionsSchema },
    ]),
  ],
  controllers: [DocumentController],
  providers: [
    DocumentService,
    { provide: IQuestionRepository, useClass: QuestionRepository },
  ],
})
export class DocumentModule {}
