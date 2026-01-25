export class QuestionContent {
  template: string;
  variables: {
    math: Record<string, string>;
    image: Record<string, string>;
  };
}

export class OptionsData {
  template: string;
  variables: {
    math: Record<string, string>;
    image: Record<string, string>;
  };
}

export class QuestionEntity {
  id?: string;
  chapter: string;
  lesson: string;
  category: string;
  level: string;
  learningOutcome: string[];
  questionType: string;
  question: QuestionContent;
  options: OptionsData[];
  createdAt?: Date;
  updatedAt?: Date;

  constructor(props: Partial<QuestionEntity>) {
    Object.assign(this, props);
    if (!this.learningOutcome) this.learningOutcome = [];
    if (!this.options) this.options = [];
    if (!this.question) {
      this.question = { template: '', variables: { math: {}, image: {} } };
    }
  }
}
