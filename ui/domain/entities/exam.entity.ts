export interface Content {
  template: string;
  variables: {
    math: Record<string, string>;
    image: Record<string, string>;
  };
}

export interface QuestionDetail {
  id: string;
  question: Content;
  options: Content[];
}

export interface ExamQuestion {
  questionType: string;
  difficultyLevel: string;
  questions: QuestionDetail[];
}

export interface ExamReponseEntity {
  id: string;
  groups: ExamQuestion[];
}

export interface ExamExportPayloadEntity {
  questionType: string;
  questionIds: string[];
}
