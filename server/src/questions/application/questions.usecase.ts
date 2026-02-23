import { Injectable } from '@nestjs/common';
import { LessonPayloadDTO, NewQuestionDTO } from './dtos/questions.dto';
import {
  LessonPayloadEntity,
  QuestionEntity,
} from '../domain/entities/question.entity';
import { IQuestionRepository } from '../domain/repositories/question.repository';

@Injectable()
export class QuestionsUseCase {
  constructor(private readonly repo: IQuestionRepository) {}

  async insert(questions: NewQuestionDTO[]): Promise<boolean> {
    const newQuestionsEntity: QuestionEntity[] = questions.map((question) => {
      return new QuestionEntity({
        chapter: question.chapter,
        lesson: question.lesson,
        exerciseType: question.exerciseType,
        difficultyLevel: question.difficultyLevel,
        learningOutcomes: question.learningOutcomes,
        questionType: question.questionType,
        question: question.question,
        options: question.options,
      });
    });
    return await this.repo.saveQuestions(newQuestionsEntity);
  }

  async generatePractice(
    title: string,
    chapter: string,
    lessons: LessonPayloadDTO[],
  ) {
    const lessonsPayloadEntity: LessonPayloadEntity[] = lessons.map(
      (lesson) =>
        new LessonPayloadEntity({
          name: lesson.name,
          questionsCount: lesson.questionsCount,
          exerciseTypes: lesson.exerciseTypes,
          difficultyLevels: lesson.difficultyLevels,
          learningOutcomes: lesson.learningOutcomes,
          questionTypes: lesson.questionTypes,
        }),
    );

    return await this.repo.getPractice(title, chapter, lessonsPayloadEntity);
  }
}
