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
  chapter: string;
  lesson: string;
  exerciseType: string;
  difficultyLevel: string;
  learningOutcomes: string[];
  questionType: string;
  question: QuestionContentDTO;
  options: OptionsDataDTO[];
}
