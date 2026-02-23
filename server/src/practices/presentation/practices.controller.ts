import { Controller, Get, Param } from '@nestjs/common';
import { PracticesUseCase } from '../application/practices.usecase';

@Controller('practice')
export class PracticesController {
  constructor(private readonly practiceUsecase: PracticesUseCase) {}

  @Get(':id')
  async parseDocx(@Param('id') id: string) {
    return await this.practiceUsecase.getPracticeById(id);
  }
}
