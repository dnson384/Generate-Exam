import { LessonDataEntity } from 'src/categories/domain/entities/category.entity';

export interface BankPool {
  chapterId: string;
  lessonId: string;
  type: string;
  level: string;
  available: number;
}

export function flatLessons(
  lessonsData: Record<string, LessonDataEntity[]>,
): BankPool[] {
  const pools: BankPool[] = [];

  Object.entries(lessonsData).forEach(([chapterId, lessons]) => {
    lessons.forEach((lesson) => {
      lesson.bankStats.forEach((stat) => {
        const type = stat.questionType;
        const count = stat.count || 0;

        if (count > 0 && stat.difficultyLevels.length > 0) {
          const countPerLevel =
            Math.floor(count / stat.difficultyLevels.length) || 1;

          stat.difficultyLevels.forEach((level) => {
            pools.push({
              chapterId,
              lessonId: lesson.id!,
              type: type,
              level: level,
              available: countPerLevel,
            });
          });
        }
      });
    });
  });

  return pools;
}
