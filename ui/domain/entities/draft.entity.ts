export interface CreateDraftPayloadEntity {
  questionsCount: number;
  questionTypes: string[];
}

export interface LessonDraft {
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

export interface ChapterDraft {
  id: string;
  name: string;
  lessons: { [lessonId: string]: LessonDraft };
}

export interface DraftEntity {
  id: string;
  questionsCount: number;
  questionTypes: string[];
  content: {
    [chapterId: string]: ChapterDraft;
  };
  createAt?: Date;
  expiredAt?: Date;
}

export interface UpdateDraftParamEntity {
  id: string;
  name: string;
}

export interface UpdateChaptersDraftPayloadEntity {
  draftId: string;
  add: UpdateDraftParamEntity[];
  del: Array<string>;
}

export interface UpdateLessonsDraftPayloadEntity {
  draftId: string;
  chapterId: string;
  add: UpdateDraftParamEntity[];
  del: Array<string>;
}
