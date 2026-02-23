interface LessonsPayload {
  name: string;
  questionsCount: number;
  exerciseTypes: string[];
  difficultyLevels: string[];
  learningOutcomes: string[];
  questionTypes: string[];
}
export interface GeneratePracticePayload {
  title: string;
  chapter: string;
  lessons: LessonsPayload[];
}
