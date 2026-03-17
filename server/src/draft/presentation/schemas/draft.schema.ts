export class CreateDraftPayload {
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

export class UpdateChapterParamPayload {
  id: string;
  name: string;
}

export interface UpdateDraftChaptersPayload {
  draftId: string;
  add: UpdateChapterParamPayload[];
  del: string[];
}

export interface UpdateDraftLessonsPayload {
  draftId: string;
  chapterId: string;
  add: UpdateChapterParamPayload[];
  del: string[];
}
