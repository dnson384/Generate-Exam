import { QuestionEntity } from '../entities/question.entity';

export abstract class IQuestionRepository {
  abstract saveQuestions(questions: QuestionEntity[]): Promise<boolean>;
}
