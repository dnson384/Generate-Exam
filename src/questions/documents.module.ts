import { Module } from '@nestjs/common';
import { DocumentController } from './presentation/documents.controller';
import { DocumentService } from './application/import-docx.usecase';

@Module({
  controllers: [DocumentController],
  providers: [DocumentService],
})
export class DocumentModule {}
