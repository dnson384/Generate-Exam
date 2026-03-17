import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { DraftsUsecase } from '../application/draft.usecase';
import type {
  CreateDraftPayload,
  UpdateDraftChaptersPayload,
  UpdateDraftLessonsPayload,
} from './schemas/draft.schema';
import {
  CreateDraftDTO,
  UpdateChaptersDraftPayloadDTO,
  UpdateLessonsDraftPayloadDTO,
} from '../application/dto/draft.dto';

@Controller('draft')
export class DraftController {
  constructor(private readonly usecase: DraftsUsecase) {}

  @Post('create')
  async createDraft(@Body() payload: CreateDraftPayload) {
    const dto: CreateDraftDTO = {
      questionsCount: payload.questionsCount,
      questionTypes: payload.questionTypes,
    };

    return await this.usecase.createDraft(dto);
  }

  @Get(':draftId')
  async getDraft(@Param('draftId') draftId: string) {
    return await this.usecase.getDraft(draftId);
  }

  @Put('chapter')
  async updateChapters(@Body() payload: UpdateDraftChaptersPayload) {
    const dto: UpdateChaptersDraftPayloadDTO = {
      draftId: payload.draftId,
      add: payload.add,
      del: payload.del,
    };

    return await this.usecase.updateChapters(dto);
  }

  @Put('lesson')
  async updateLessons(@Body() payload: UpdateDraftLessonsPayload) {
    const dto: UpdateLessonsDraftPayloadDTO = {
      draftId: payload.draftId,
      chapterId: payload.chapterId,
      add: payload.add,
      del: payload.del,
    };

    return await this.usecase.updateLessons(dto);
  }

  @Put('generate-matrix')
  async generateMatrix(@Query('draftId') draftId: string) {
    return await this.usecase.generateMatrix(draftId);
  }

  @Put('generate-matrix-details')
  async generateMatrixDetails(@Query('draftId') draftId: string) {
    return await this.usecase.generateMatrixDetails(draftId);
  }
}
