export interface QuestionContentDTO {
  template: string;
  variables: {
    math: Record<string, string>;
    image: Record<string, string>;
  };
}

export interface OptionsDataDTO {
  template: string;
  variables: {
    math: Record<string, string>;
    image: Record<string, string>;
  };
}

export interface NewQuestionDTO {
  subject: string,
  chapterId: string;
  lessonId: string;
  exerciseType: string;
  difficultyLevel: string;
  learningOutcomes: string[];
  questionType: string;
  question: QuestionContentDTO;
  options: OptionsDataDTO[];
}

export interface LessonPayloadDTO {
  name: string;
  questionsCount: number;
  exerciseTypes: string[];
  difficultyLevels: string[];
  learningOutcomes: string[];
  questionTypes: string[];
}
