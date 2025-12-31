import { Module } from '@nestjs/common';
import { DocumentModule } from './questions/documents.module';

@Module({
  imports: [DocumentModule],
})
export class AppModule {}
