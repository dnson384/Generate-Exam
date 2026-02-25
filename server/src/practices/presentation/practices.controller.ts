import { Controller, Get, Param } from '@nestjs/common';
import { PracticesUseCase } from '../application/practices.usecase';

@Controller('practice')
export class PracticesController {
  constructor(private readonly practiceUsecase: PracticesUseCase) {}

  @Get('/all')
  async getAllPractice() {
    return await this.practiceUsecase.getAllPractices();
  }

  @Get(':id')
  async getPracticeDetailById(@Param('id') id: string) {
    return await this.practiceUsecase.getPracticeDetailById(id);
  }
}
