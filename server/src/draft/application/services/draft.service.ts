import { Injectable } from '@nestjs/common';
import { DraftEntity } from 'src/draft/domain/entities/draft.entity';
import { IDraftsRepository } from 'src/draft/domain/repositories/draft.repository';

@Injectable()
export class DraftsServices {
  constructor(private readonly repo: IDraftsRepository) {}

  async getDraft(draftId: string): Promise<DraftEntity> {
    return await this.repo.getDraft(draftId);
  }

  async deleteDraft(draftId: string): Promise<boolean> {
    return await this.repo.deleteDraft(draftId);
  }
}
