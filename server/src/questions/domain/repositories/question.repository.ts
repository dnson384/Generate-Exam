import {
  QuestionEntity,
  LessonPayloadEntity,
} from '../entities/question.entity';

export abstract class IQuestionRepository {
  abstract saveQuestions(questions: QuestionEntity[]): Promise<boolean>;
  abstract getPracticeQuestions(
    title: string,
    chapter: string,
    lessons: LessonPayloadEntity[],
  ): Promise<any>;
  abstract findByLessonIds(lessonIds: string[]): Promise<QuestionEntity[]>;
}
