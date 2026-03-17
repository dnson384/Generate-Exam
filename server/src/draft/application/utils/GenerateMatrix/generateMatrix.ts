import { NotFoundException } from '@nestjs/common';

import { LessonDataEntity } from 'src/categories/domain/entities/category.entity';
import { ChapterDraft } from 'src/draft/domain/entities/draft.entity';

import createMatrixConfig from './createMatrixConfig';
import { createLevelConfig } from './createLevelConfig';
import { BankPool, flatLessons } from './flatLessons';

const LEVELS = ['Nhận biết', 'Thông hiểu', 'Vận dụng', 'Vận dụng cao'];

export default function generateMatrixUtil(
  lessonsData: Record<string, LessonDataEntity[]>,
  newDraftChapters: ChapterDraft[],
  questionTypes: string[],
  questionsCount: number,
) {
  const neededByType: Record<string, number> = {};
  createMatrixConfig(questionTypes, questionsCount, neededByType);
  const neededByLevel = createLevelConfig(questionsCount);

  const availablePools: BankPool[] = flatLessons(lessonsData);

  newDraftChapters.forEach((chapter) => {
    chapter.lessons.forEach((lesson) => {
      lesson.matrix = [];

      questionTypes.forEach((type) => {
        LEVELS.forEach((level) => {
          lesson.matrix.push({
            questionType: type,
            difficultyLevel: level,
            selectedCount: 0,
          });
        });
      });
    });
  });

  let totalAllocated = 0;
  const maxAttempts = questionsCount * 10;
  let attempts = 0;

  while (totalAllocated < questionsCount && attempts < maxAttempts) {
    attempts++;

    const targetType = Object.keys(neededByType).find(
      (t) => neededByType[t] > 0,
    );
    const targetLevel = Object.keys(neededByLevel).find(
      (l) => neededByLevel[l] > 0,
    );

    let lessonName = '';

    if (!targetType || !targetLevel) break;

    const matchingPoolIndex = availablePools.findIndex(
      (pool) =>
        pool.available > 0 &&
        pool.type === targetType &&
        pool.level === targetLevel,
    );

    if (matchingPoolIndex !== -1) {
      const pool = availablePools[matchingPoolIndex];
      pool.available -= 1;
      neededByType[targetType] -= 1;
      neededByLevel[targetLevel] -= 1;
      totalAllocated += 1;

      const chapter = newDraftChapters.find((c) => c.id === pool.chapterId);
      const lesson = chapter?.lessons.find((l) => l.id === pool.lessonId);

      if (lesson) {
        lessonName = lesson.name;
        const existingMatrixItem = lesson.matrix.find(
          (m) =>
            m.questionType === targetType && m.difficultyLevel === targetLevel,
        );

        if (existingMatrixItem) {
          existingMatrixItem.selectedCount += 1;
        }
      }
    } else {
      console.warn(
        `Kho thiếu câu ${lessonName} - ${targetType} - ${targetLevel}. Rất có thể đề không đủ cấu trúc.`,
      );
      neededByType[targetType] -= 1;
      neededByLevel[targetLevel] -= 1;
    }
  }

  if (totalAllocated < questionsCount) {
    throw new NotFoundException(
      `Ngân hàng câu hỏi không đủ số lượng. Cần ${questionsCount} nhưng chỉ phân bổ được ${totalAllocated}`,
    );
  }

  return newDraftChapters;
}
