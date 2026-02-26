export interface QuestionContent {
  template: string;
  variables: {
    math: Record<string, string>;
    image: Record<string, string>;
  };
}

export interface OptionsData {
  template: string;
  variables: {
    math: Record<string, string>;
    image: Record<string, string>;
  };
}

interface QuestionData {
  id: string;
  questionType: string;
  question: QuestionContent;
  options: OptionsData[];
}

export class ExportPayload {
  title: string;
  questionsSorted: Record<string, QuestionData[]>;
}
