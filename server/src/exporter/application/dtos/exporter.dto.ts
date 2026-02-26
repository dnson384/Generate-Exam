export class ContentDTO {
  template: string;
  variables: {
    math: Record<string, string>;
    image: Record<string, string>;
  };
}

export class QuestionDataDTO {
  id: string;
  questionType: string;
  question: ContentDTO;
  options: ContentDTO[];
}

export class WordPayloadDTO {
  title: string;
  questionsSorted: Record<string, QuestionDataDTO[]>;
}
