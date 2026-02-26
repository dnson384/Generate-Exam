export class QuestionContentDTO {
  template: string;
  variables: {
    math: Record<string, string>;
    image: Record<string, string>;
  };
}

export class OptionsDataDTO {
  template: string;
  variables: {
    math: Record<string, string>;
    image: Record<string, string>;
  };
}

export class QuestionDataDTO {
  id: string;
  questionType: string;
  question: QuestionContentDTO;
  options: OptionsDataDTO[];
}

export class WordPayloadDTO {
  title: string;
  questionsSorted: Record<string, QuestionDataDTO[]>;
}
