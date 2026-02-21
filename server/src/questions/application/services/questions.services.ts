import { Injectable } from '@nestjs/common';
import { NewQuestionDTO } from '../dtos/questions.dto';
import { QuestionEntity } from 'src/questions/domain/entities/question.entity';
import { IQuestionRepository } from 'src/questions/domain/repositories/question.repository';

@Injectable()
export class QuestionsServices {
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
}
