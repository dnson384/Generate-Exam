import { Controller, Get } from '@nestjs/common';
import { CategoriesUseCase } from '../application/category.usecase';
import { CategoriesResponseDTO } from '../application/dto/category.dto';


@Controller('category')
export class CategoriesController {
  constructor(private readonly categoriesUsecase: CategoriesUseCase) {}

  @Get('all')
  async getAll(): Promise<CategoriesResponseDTO[]> {
    return await this.categoriesUsecase.getAll();
  }
}
