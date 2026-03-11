export class LessonDraft {
  id: string;
  name: string;
  matrix: { [questionType: string]: { [level: string]: number } };
  matrixDetails: {
    [level: string]: {
      [outcome: string]: {
        [questionType: string]: number;
      };
    };
  };
}

export class ChapterDraft {
  id: string;
  name: string;
  lessons: { [lessonId: string]: LessonDraft };
}

export class DraftEntity {
  id?: string;
  questionsCount: number;
  questionTypes: string[];
  content: {
    [chapterId: string]: ChapterDraft;
  };
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

    if (!this.content) {
      this.content = {};
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
  matrix: { [excerciseType: string]: { [level: string]: number } };

  constructor(props: Partial<UpdateMatrixEntity>) {
    Object.assign(this, props);
  }
}
