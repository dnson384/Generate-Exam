import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DraftsModule } from 'src/draft/drafts.module';
import { QuestionsModule } from 'src/questions/questions.module';

import { IExamsRepository } from './domain/repositories/exams.repository';
import { ExamsUseCase } from './application/exams.usecase';
import { Exams, ExamsSchema } from './infrastructure/schemas/exam.schema';
import { ExamsRepositoryImpl } from './infrastructure/repositories/exams.repository';
import { ExamsController } from './presentation/exams.controller';

@Module({
  imports: [
    DraftsModule,
    QuestionsModule,
    MongooseModule.forFeature([{ name: Exams.name, schema: ExamsSchema }]),
  ],
  controllers: [ExamsController],
  providers: [
    ExamsUseCase,
    { provide: IExamsRepository, useClass: ExamsRepositoryImpl },
  ],
})
export class ExamsModule {}
