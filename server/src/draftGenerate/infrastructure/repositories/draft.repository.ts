import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IDraftsRepository } from 'src/draftGenerate/domain/repositories/draft.repository';
import { DraftDocument, Drafts } from '../schemas/draft.schema';
import { Model, Types } from 'mongoose';
import {
  DraftEntity,
  UpdateChaptersEntity,
  UpdateLessonsEntity,
  UpdateMatrixEntity,
} from 'src/draftGenerate/domain/entities/draft.entity';
import { DraftMapper } from '../mappers/draft.mapper';

@Injectable()
export class DraftsRepository implements IDraftsRepository {
  constructor(
    @InjectModel(Drafts.name) private readonly draftModel: Model<DraftDocument>,
  ) {}

  async createDraft(draft: DraftEntity): Promise<string> {
    const draftSchema: Partial<Drafts> = DraftMapper.toSchema(draft);
    const result = await this.draftModel.create(draftSchema);
    return result.id.toString();
  }

  async getDraft(draftId: string): Promise<DraftEntity> {
    const draft = await this.draftModel.findById(draftId);

    if (!draft) throw new NotFoundException('Bản nháp không tồn tại');

    const draftDomain = DraftMapper.toDomain(draft);

    return draftDomain;
  }

  async updateChapters(payload: UpdateChaptersEntity): Promise<boolean> {
    const updateQuery: Record<string, any> = {};

    // Thêm
    if (payload.add && payload.add.length > 0) {
      const setOps: Record<string, any> = {};
      payload.add.forEach((chapter) => {
        setOps[`content.${chapter.id}`] = {
          id: new Types.ObjectId(chapter.id),
          name: chapter.name,
          lessons: {},
        };
      });

      updateQuery['$set'] = setOps;
    }

    // Xoá
    if (payload.del && payload.del.length > 0) {
      const unsetOps: Record<string, any> = {};
      payload.del.forEach((chapterId) => {
        unsetOps[`content.${chapterId}`] = 1;
      });

      updateQuery['$unset'] = unsetOps;
    }

    if (!updateQuery.$set && !updateQuery.$unset) {
      return false;
    }

    const result = await this.draftModel.updateOne(
      { _id: payload.draftId },
      updateQuery,
    );

    return result.modifiedCount > 0;
  }

  async updateLessons(payload: UpdateLessonsEntity): Promise<boolean> {
    const updateQuery: Record<string, any> = {};

    // Thêm
    if (payload.add && payload.add.length > 0) {
      const setOps: Record<string, any> = {};
      payload.add.forEach((lesson) => {
        setOps[`content.${payload.chapterId}.lessons.${lesson.id}`] = {
          id: new Types.ObjectId(lesson.id),
          name: lesson.name,
          matrix: {},
          matrixDetails: {},
        };
      });

      updateQuery['$set'] = setOps;
    }

    // Xoá
    if (payload.del && payload.del.length > 0) {
      const unsetOps: Record<string, any> = {};
      payload.del.forEach((lessonId) => {
        unsetOps[`content.${payload.chapterId}.lessons.${lessonId}`] = 1;
      });

      updateQuery['$unset'] = unsetOps;
    }

    if (!updateQuery.$set && !updateQuery.$unset) {
      return false;
    }

    const result = await this.draftModel.updateOne(
      {
        _id: payload.draftId,
        [`content.${payload.chapterId}`]: { $exists: true },
      },
      updateQuery,
    );

    return result.modifiedCount > 0;
  }

  async updateMatrix(payload: UpdateMatrixEntity[]): Promise<boolean> {
    const query = payload.map((item) => ({
      updateOne: {
        filter: {
          _id: new Types.ObjectId(item.draftId),
        },
        update: {
          $set: {
            [`content.${item.chapterId}.lessons.${item.lessonId}.matrix`]:
              item.matrix,
          },
        },
      },
    }));

    await this.draftModel.bulkWrite(query);
    return true;
  }
}
