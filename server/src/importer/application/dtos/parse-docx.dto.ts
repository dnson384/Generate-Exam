export interface QuestionContentImporterDTO {
  template: string;
  variables: {
    math: Record<string, string>;
    image: Record<string, string>;
  };
}

export interface OptionsDataImporterDTO {
  template: string;
  variables: {
    math: Record<string, string>;
    image: Record<string, string>;
  };
}

export interface NewQuestionImporterDTO {
  chapter: string;
  lesson: string;
  exerciseType: string;
  difficultyLevel: string;
  learningOutcomes: string[];
  questionType: string;
  question: QuestionContentImporterDTO;
  options: OptionsDataImporterDTO[];
}

export interface LessonDataImporterDTO {
  name: string;
  exerciseTypes: string[];
  difficultyLevels: string[];
  learningOutcomes: string[];
  questionTypes: string[];
}

export interface NewCategoryImporterDTO {
  chapter: string;
  lessons: LessonDataImporterDTO[];
}

export class ParsedDataOutput {
  questions: NewQuestionImporterDTO[];
  category: NewCategoryImporterDTO;
}
