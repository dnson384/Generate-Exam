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
  exerciseType: string;
  difficultyLevel: string;
  learningOutcomes: string[];
  questionType: string;
  question: QuestionContent;
  options: OptionsData[];
  createdAt?: Date;
  updatedAt?: Date;

  constructor(props: Partial<QuestionEntity>) {
    Object.assign(this, props);
    if (!this.learningOutcomes) this.learningOutcomes = [];
    if (!this.options) this.options = [];
    if (!this.question) {
      this.question = { template: '', variables: { math: {}, image: {} } };
    }
  }
}
