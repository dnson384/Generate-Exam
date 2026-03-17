import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { IDraftsRepository } from './domain/repositories/draft.repository';

import { DraftsUsecase } from './application/draft.usecase';
import { DraftsServices } from './application/services/draft.service';

import { DraftsRepository } from './infrastructure/repositories/draft.repository';
import { Drafts, DraftSchema } from './infrastructure/schemas/draft.schema';

import { DraftController } from './presentation/draft.controller';

import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [
    CategoriesModule,
    MongooseModule.forFeature([{ name: Drafts.name, schema: DraftSchema }]),
  ],
  controllers: [DraftController],
  providers: [
    DraftsUsecase,
    DraftsServices,
    { provide: IDraftsRepository, useClass: DraftsRepository },
  ],
  exports: [DraftsServices],
})
export class DraftsModule {}
