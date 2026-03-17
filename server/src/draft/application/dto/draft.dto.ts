import { LessonDataEntity } from 'src/categories/domain/entities/category.entity';

export interface CreateDraftDTO {
  questionsCount: number;
  questionTypes: string[];
}

export interface LessonDraftDTO {
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

export interface ChapterDraftDTO {
  id: string;
  name: string;
  lessons: { [lessonId: string]: LessonDraftDTO };
}

export class UpdateChapterParamPayloadDTO {
  id: string;
  name: string;
}

export interface UpdateChaptersDraftPayloadDTO {
  draftId: string;
  add: UpdateChapterParamPayloadDTO[];
  del: string[];
}

export interface UpdateLessonsDraftPayloadDTO {
  draftId: string;
  chapterId: string;
  add: UpdateChapterParamPayloadDTO[];
  del: string[];
}

export interface FlattenLesson {
  lessonId: string;
  chapterId: string;
  questionTypes: Record<string, number>;
  difficultyLevels: Record<string, number>;
}
