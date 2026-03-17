import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ExamsUseCase } from '../application/exams.usecase';

@Controller('exam')
export class ExamsController {
  constructor(private readonly examsUseCase: ExamsUseCase) {}

  @Post('generate')
  async generateExam(@Body('draftId') draftId: string) {
    return await this.examsUseCase.generateExam(draftId);
  }

  @Get(':examId')
  async getExamById(@Param('examId') examId: string) {
    return await this.examsUseCase.getExamById(examId);
  }
}
