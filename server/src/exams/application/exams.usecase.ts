import { Injectable, NotFoundException } from '@nestjs/common';
import { Transactional } from '@nestjs-cls/transactional';

import { DraftsServices } from 'src/draft/application/services/draft.service';
import { QuestionsServices } from 'src/questions/application/services/questions.services';
import { ExamMatrixDetailDTO } from 'src/questions/application/dtos/exam.dto';

import { IExamsRepository } from '../domain/repositories/exams.repository';
import { ChapterExamData, ExamEntity } from '../domain/entities/exam.entity';

@Injectable()
export class ExamsUseCase {
  constructor(
    private readonly repo: IExamsRepository,
    private readonly draftsService: DraftsServices,
    private readonly questionsService: QuestionsServices,
  ) {}

  @Transactional()
  async generateExam(draftId: string): Promise<string> {
    const draft = await this.draftsService.getDraft(draftId);
    if (!draft) throw new NotFoundException('Bản nháp không tồn tại');

    const chaptersExam: ChapterExamData[] = [];

    const examMatrixDetailsDTO: ExamMatrixDetailDTO[] = [];
    draft.chapters.forEach((chapter) => {
      const lessonIds = chapter.lessons.map((lesson) => lesson.id);

      chaptersExam.push({
        id: chapter.id,
        lessonIds: lessonIds,
      });

      chapter.lessons.forEach((lesson) => {
        lesson.matrixDetails.forEach((matrixDetail) => {
          if (matrixDetail.selectedCount > 0) {
            examMatrixDetailsDTO.push({
              chaperId: chapter.id,
              lessonId: lesson.id,
              exerciseType: matrixDetail.exerciseType,
              difficultyLevel: matrixDetail.difficultyLevel,
              learningOutcome: matrixDetail.learningOutcome,
              questionType: matrixDetail.questionType,
              limit: matrixDetail.selectedCount,
            });
          }
        });
      });
    });

    const questions =
      await this.questionsService.generateExamQuestions(examMatrixDetailsDTO);

    const payload: ExamEntity = new ExamEntity({
      chapters: chaptersExam,
      questions: questions.map((q) => ({
        questionType: q.questionType,
        difficultyLevel: q.difficultyLevel,
        questionIds: q.questionIds,
      })),
    });

    const savedExamId = await this.repo.saveExam(payload);
    await this.draftsService.deleteDraft(draftId);
    return savedExamId;
  }


  async getExamById (examId: string): Promise<any> {
    
  }
}
