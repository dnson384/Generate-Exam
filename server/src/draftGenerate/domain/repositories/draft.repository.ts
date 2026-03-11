import {
  DraftEntity,
  UpdateChaptersEntity,
  UpdateLessonsEntity,
  UpdateMatrixEntity,
} from '../entities/draft.entity';

export abstract class IDraftsRepository {
  abstract createDraft(draft: DraftEntity): Promise<string>;
  abstract getDraft(draftId: string): Promise<DraftEntity>;
  abstract updateChapters(payload: UpdateChaptersEntity): Promise<boolean>;
  abstract updateLessons(payload: UpdateLessonsEntity): Promise<boolean>;
  abstract updateMatrix(payload: UpdateMatrixEntity[]): Promise<boolean>;
}
