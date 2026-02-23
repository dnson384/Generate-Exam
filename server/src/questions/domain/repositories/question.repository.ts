import {
  QuestionEntity,
  LessonPayloadEntity,
} from '../entities/question.entity';

export abstract class IQuestionRepository {
  abstract saveQuestions(questions: QuestionEntity[]): Promise<boolean>;
  abstract getPractice(
    title: string,
    chapter: string,
    lessons: LessonPayloadEntity[],
  ): Promise<any>;
}
