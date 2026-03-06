export class LessonDataEntity {
  id?: string;
  name: string;
  exerciseTypes: string[];
  difficultyLevels: string[];
  learningOutcomes: string[];
  questionTypes: string[];

  constructor(props: Partial<LessonDataEntity>) {
    Object.assign(this, props);
    if (!this.exerciseTypes) this.exerciseTypes = [];
    if (!this.difficultyLevels) this.difficultyLevels = [];
    if (!this.learningOutcomes) this.learningOutcomes = [];
    if (!this.questionTypes) this.questionTypes = [];
  }
}

export class CategoryEntity {
  id?: string;
  subject: string;
  chapter: string;
  lessons: LessonDataEntity[];
  createdAt?: Date;
  updatedAt?: Date;

  constructor(props: Partial<CategoryEntity>) {
    Object.assign(this, props);
    if (!this.lessons) this.lessons = [];
  }
}
