import { Module } from '@nestjs/common';
import { DocumentController } from './presentation/documents.controller';
import { ImportQuestionsUseCase } from './application/import-questions.usecase';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Questions,
  QuestionsSchema,
} from './infrastructure/database/schemas/question.model';
import { IQuestionRepository } from './domain/repositories/question.repository';
import { QuestionRepository } from './infrastructure/database/repositories/question.repository';
import { IFileParser } from './application/ports/file-parser.port';
import { PandocParserService } from './infrastructure/services/pandoc/pandoc-parser.service';
import { ICategoriesRepository } from './domain/repositories/category.repository';
import { CategoriesRepository } from './infrastructure/database/repositories/category.repository';
import {
  Categories,
  CategoriesSchema,
} from './infrastructure/database/schemas/category.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Questions.name, schema: QuestionsSchema },
      { name: Categories.name, schema: CategoriesSchema },
    ]),
  ],
  controllers: [DocumentController],
  providers: [
    ImportQuestionsUseCase,
    { provide: IQuestionRepository, useClass: QuestionRepository },
    { provide: ICategoriesRepository, useClass: CategoriesRepository },
    { provide: IFileParser, useClass: PandocParserService },
  ],
})
export class DocumentModule {}
