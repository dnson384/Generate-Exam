export class MatrixItem {
  questionType: string;
  difficultyLevel: string;
  selectedCount: number;
}

export class MatrixDetailItem {
  exerciseType: string;
  difficultyLevel: string;
  learningOutcome: string;
  questionType: string;
  selectedCount: number;
}

export class LessonDraft {
  id: string;
  name: string;
  matrix: MatrixItem[];
  matrixDetails: MatrixDetailItem[];
}

export class ChapterDraft {
  id: string;
  name: string;
  lessons: LessonDraft[];
}

export class DraftEntity {
  id?: string;
  questionsCount: number;
  questionTypes: string[];
  chapters: ChapterDraft[];
  createAt?: Date;
  expiredAt?: Date;

  constructor(props: Partial<DraftEntity>) {
    Object.assign(this, props);

    if (this.questionTypes.length < 3) {
      this.questionTypes = [
        'Nhiều lựa chọn',
        'Đúng sai',
        'Trả lời ngắn',
        'Tự luận',
      ];
    }

    if (!this.chapters) {
      this.chapters = [];
    }
  }
}

export class UpdateChapterParamEntity {
  id: string;
  name: string;
}

export class UpdateChaptersEntity {
  draftId: string;
  add: UpdateChapterParamEntity[];
  del: string[];

  constructor(props: Partial<UpdateChaptersEntity>) {
    Object.assign(this, props);
  }
}

export class UpdateLessonsEntity {
  draftId: string;
  chapterId: string;
  add: UpdateChapterParamEntity[];
  del: string[];

  constructor(props: Partial<UpdateLessonsEntity>) {
    Object.assign(this, props);
  }
}

export class UpdateMatrixEntity {
  draftId: string;
  chapterId: string;
  lessonId: string;
  matrix: MatrixItem[];

  constructor(props: Partial<UpdateMatrixEntity>) {
    Object.assign(this, props);
  }
}

export class UpdateMatrixDetailsEntity {
  draftId: string;
  chapterId: string;
  lessonId: string;
  matrixDetails: MatrixDetailItem[];

  constructor(props: Partial<UpdateMatrixDetailsEntity>) {
    Object.assign(this, props);
  }
}
