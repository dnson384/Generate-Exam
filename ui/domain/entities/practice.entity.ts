import { QuestionEntity } from "./question.entity";

export interface PracticeDetailEntity {
  title: string;
  chapter: string;
  questionsCount: number;
  questions: QuestionEntity[];
}
