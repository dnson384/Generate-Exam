import { Injectable, NotFoundException } from '@nestjs/common';
import { IDraftsRepository } from '../domain/repositories/draft.repository';
import {
  CreateDraftDTO,
  UpdateChaptersDraftPayloadDTO,
  UpdateLessonsDraftPayloadDTO,
} from './dto/draft.dto';
import {
  DraftEntity,
  UpdateChaptersEntity,
  UpdateLessonsEntity,
  UpdateMatrixEntity,
} from '../domain/entities/draft.entity';
import { CategoriesServices } from 'src/categories/application/services/category.services';
import generateMatrixUtil from './utils/generateMatrix';
import { LessonDataEntity } from 'src/categories/domain/entities/category.entity';

@Injectable()
export class DraftsUsecase {
  constructor(
    private readonly repo: IDraftsRepository,
    private readonly CategoriesServices: CategoriesServices,
  ) {}

  async createDraft(payload: CreateDraftDTO): Promise<string> {
    const payloadDomain = new DraftEntity({
      questionsCount: payload.questionsCount,
      questionTypes: payload.questionTypes,
    });

    return await this.repo.createDraft(payloadDomain);
  }

  async getDraft(draftId: string): Promise<DraftEntity> {
    return await this.repo.getDraft(draftId);
  }

  async updateChapters(
    payload: UpdateChaptersDraftPayloadDTO,
  ): Promise<boolean> {
    const payloadDomain: UpdateChaptersEntity = new UpdateChaptersEntity({
      draftId: payload.draftId,
      add: payload.add,
      del: payload.del,
    });

    return await this.repo.updateChapters(payloadDomain);
  }

  async updateLessons(payload: UpdateLessonsDraftPayloadDTO): Promise<boolean> {
    const payloadDomain: UpdateLessonsEntity = new UpdateLessonsEntity({
      draftId: payload.draftId,
      chapterId: payload.chapterId,
      add: payload.add,
      del: payload.del,
    });

    return await this.repo.updateLessons(payloadDomain);
  }

  async generateMatrix(draftId: string): Promise<boolean> {
    const draft = await this.getDraft(draftId);

    if (!draft) throw new NotFoundException('Bản nháp không tồn tại');

    const chapterIds = Object.keys(draft.content);
    const categories = await this.CategoriesServices.getByIds(chapterIds);
    const cateMap = new Map(categories.map((chapter) => [chapter.id, chapter]));

    const lessonsData: Record<string, LessonDataEntity[]> = {};

    Object.entries(draft.content).forEach(([chapterId, chapterData]) => {
      const lessonIds = Object.keys(chapterData.lessons);
      const curChapter = cateMap.get(chapterId);

      if (!curChapter) throw new NotFoundException('Chương không tồn tại');

      const curLesson: LessonDataEntity[] = curChapter.lessons.filter(
        (lesson) => lessonIds.includes(lesson.id!),
      );

      lessonsData[chapterId] = curLesson;
    });

    if (Object.keys(lessonsData).length === 0)
      throw new NotFoundException('Nội dung không tồn tại');

    const newDraftContent = { ...draft.content };
    generateMatrixUtil(
      lessonsData,
      newDraftContent,
      draft.questionTypes,
      draft.questionsCount,
    );

    const payload: UpdateMatrixEntity[] = [];
    Object.entries(newDraftContent).forEach(([chapterId, chapterData]) => {
      Object.entries(chapterData.lessons).forEach(([lessonId, lessonData]) => {
        payload.push(
          new UpdateMatrixEntity({
            draftId: draft.id!,
            chapterId: chapterId,
            lessonId: lessonId,
            matrix: lessonData.matrix,
          }),
        );
      });
    });

    return this.repo.updateMatrix(payload);
  }
}
