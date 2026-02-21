import { Module } from '@nestjs/common';
import { ImporterController } from './presentation/documents.controller';
import { ImporterUseCase } from './application/importer.usecase';
import { IFileParser } from './application/ports/file-parser.port';
import { PandocParserService } from './infrastructure/services/pandoc/pandoc-parser.service';
import { ITransactionManager } from './application/ports/transaction-manager.port';
import { ClsTransactionAdapter } from './infrastructure/database/cls-transaction.adapter';

@Module({
  controllers: [ImporterController],
  providers: [
    ImporterUseCase,
    { provide: IFileParser, useClass: PandocParserService },
    { provide: ITransactionManager, useClass: ClsTransactionAdapter },
  ],
})
export class DocumentModule {}
