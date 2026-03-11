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
  exerciseType: string;
  difficultyLevel: string;
  learningOutcomes: string[];
  questionType: string;
  question: QuestionContentImporterDTO;
  options: OptionsDataImporterDTO[];
}

export interface LessonDataImporterDTO {
  name: string;
  exerciseTypes: { [name: string]: number }
  difficultyLevels: { [name: string]: number }
  learningOutcomes: { [name: string]: number }
  questionTypes: { [name: string]: number }
}

export interface NewCategoryImporterDTO {
  chapter: string;
  lessons: LessonDataImporterDTO[];
}

export class ParsedDataOutput {
  questions: NewQuestionImporterDTO[];
  category: NewCategoryImporterDTO;
}
