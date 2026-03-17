export class ChapterExamData {
  id: string;
  lessonIds: string[];
}

export class QuestionExamData {
  questionType: string;
  difficultyLevel: string;
  questionIds: string[];
}

export class ExamEntity {
  id?: string;
  chapters: ChapterExamData[];
  questions: QuestionExamData[];

  constructor(props: Partial<ExamEntity>) {
    Object.assign(this, props);

    if (!this.chapters) this.chapters = [];
    if (!this.questions) this.questions = [];
  }
}
