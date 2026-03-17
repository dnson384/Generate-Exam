import { Injectable } from '@nestjs/common';
import { NewQuestionDTO } from '../dtos/questions.dto';
import { QuestionEntity } from 'src/questions/domain/entities/question.entity';
import { IQuestionRepository } from 'src/questions/domain/repositories/question.repository';
import {
  ExamMatrixDetailDTO,
  ExamQuestionsResponseDTO,
} from '../dtos/exam.dto';

@Injectable()
export class QuestionsServices {
  constructor(private readonly repo: IQuestionRepository) {}

  async insert(questions: NewQuestionDTO[]): Promise<boolean> {
    const newQuestionsEntity: QuestionEntity[] = questions.map((question) => {
      return new QuestionEntity({
        subject: question.subject,
        chapterId: question.chapterId,
        lessonId: question.lessonId,
        exerciseType: question.exerciseType,
        difficultyLevel: question.difficultyLevel,
        learningOutcomes: question.learningOutcomes,
        questionType: question.questionType,
        question: question.question,
        options: question.options,
      });
    });
    return await this.repo.saveQuestions(newQuestionsEntity);
  }

  async generateExamQuestions(
    matrixDetails: ExamMatrixDetailDTO[],
  ): Promise<ExamQuestionsResponseDTO[]> {
    const uniqueLessonIds = [...new Set(matrixDetails.map((m) => m.lessonId))];
    if (uniqueLessonIds.length === 0) return [];

    const allQuestionsInLessons =
      await this.repo.findByLessonIds(uniqueLessonIds);

    let availablePool = [...allQuestionsInLessons];
    const groupedResult: Record<string, ExamQuestionsResponseDTO> = {};

    matrixDetails.forEach((detail) => {
      if (detail.limit <= 0) return;

      const matchingQuestions = availablePool.filter(
        (q) =>
          q.lessonId === detail.lessonId &&
          q.exerciseType === detail.exerciseType &&
          q.difficultyLevel === detail.difficultyLevel &&
          q.questionType === detail.questionType &&
          q.learningOutcomes.includes(detail.learningOutcome),
      );

      if (matchingQuestions.length < detail.limit) {
        console.warn(
          `[Thiếu câu hỏi] Yêu cầu ${detail.limit} nhưng chỉ có ${matchingQuestions.length} câu phù hợp cho ${detail.learningOutcome}`,
        );
      }

      const shuffled = matchingQuestions.sort(() => 0.5 - Math.random());

      const selectedQuestions = shuffled.slice(0, detail.limit);
      const selectedIds = selectedQuestions.map((q) => q.id!);

      if (selectedIds.length > 0) {
        const groupKey = `${detail.questionType}_${detail.difficultyLevel}`;

        if (!groupedResult[groupKey]) {
          groupedResult[groupKey] = {
            questionType: detail.questionType,
            difficultyLevel: detail.difficultyLevel,
            questionIds: [],
          };
        }

        groupedResult[groupKey].questionIds.push(...selectedIds);

        availablePool = availablePool.filter(
          (q) => !selectedIds.includes(q.id!),
        );
      }
    });

    return Object.values(groupedResult);
  }
}
