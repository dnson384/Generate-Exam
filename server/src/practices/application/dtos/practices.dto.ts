import { QuestionEntity } from 'src/questions/domain/entities/question.entity';

export interface NewPracticeDTO {
  title: string;
  chapter: string;
  questionsCount: number;
  questionsId: string[];
}

export interface PracticeDetailDTO {
  title: string;
  chapter: string;
  questionsCount: number;
  questions: QuestionEntity[];
}
