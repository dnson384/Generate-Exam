import { Module } from '@nestjs/common';
import { ImporterController } from './presentation/importer.controller';
import { ImporterUseCase } from './application/importer.usecase';
import { IFileParser } from './application/ports/file-parser.port';
import { PandocParserService } from './infrastructure/services/pandoc/pandocParser.service';
import { ITransactionManager } from './application/ports/transaction-manager.port';
import { ClsTransactionAdapter } from './infrastructure/database/cls-transaction.adapter';
import { QuestionsModule } from 'src/questions/questions.module';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [QuestionsModule, CategoriesModule],
  controllers: [ImporterController],
  providers: [
    ImporterUseCase,
    { provide: IFileParser, useClass: PandocParserService },
    { provide: ITransactionManager, useClass: ClsTransactionAdapter },
  ],
})
export class ImporterModule {}
