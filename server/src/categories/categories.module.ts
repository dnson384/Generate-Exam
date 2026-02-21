import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesController } from './presentation/categories.controller';
import {
  Categories,
  CategoriesSchema,
} from './infrastructure/database/schemas/category.schemas';
import { ICategoriesRepository } from './domain/repositories/category.repository';
import { CategoriesRepository } from './infrastructure/database/repositories/category.repository';
import { CategoriesServices } from './application/services/category.services';
import { CategoriesUseCase } from './application/category.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Categories.name, schema: CategoriesSchema },
    ]),
  ],
  controllers: [CategoriesController],
  providers: [
    CategoriesServices,
    CategoriesUseCase,
    { provide: ICategoriesRepository, useClass: CategoriesRepository },
  ],
  exports: [CategoriesServices],
})
export class CategoriesModule {}
