import { Body, Controller, Post } from '@nestjs/common';
import { QuestionsUseCase } from 'src/questions/application/questions.usecase';
import type { GeneratePracticePayload } from './schemas/questions.schema';
import { LessonPayloadDTO } from '../application/dtos/questions.dto';

@Controller('question')
export class QuestionsController {
  constructor(private readonly questionsUseCase: QuestionsUseCase) {}

  @Post('generate-practice')
  async generatePractice(@Body() payload: GeneratePracticePayload) {
    const { title, chapter, lessons } = payload;
    const lessonsDTO: LessonPayloadDTO[] = lessons.map((lesson) => ({
      name: lesson.name,
      questionsCount: lesson.questionsCount,
      exerciseTypes: lesson.exerciseTypes,
      difficultyLevels: lesson.difficultyLevels,
      learningOutcomes: lesson.learningOutcomes,
      questionTypes: lesson.questionTypes,
    }));

    return await this.questionsUseCase.generatePractice(
      title,
      chapter,
      lessonsDTO,
    );
  }
}
