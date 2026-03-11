import { LessonDataEntity } from 'src/categories/domain/entities/category.entity';
import { ChapterDraft } from 'src/draftGenerate/domain/entities/draft.entity';
import createMatrixConfig from './createMatrixConfig';
import splitLevels from './splitLevel';

export default function generateMatrixUtil(
  lessonsData: Record<string, LessonDataEntity[]>,
  newDraft: Record<string, ChapterDraft>,
  questionTypes: string[],
  questionsCount: number,
) {
  const config: Record<string, number> = {};
  createMatrixConfig(questionTypes, questionsCount, config);

  const lessons = Object.entries(lessonsData).flatMap(([chapterId, lessons]) =>
    lessons.map((lesson) => ({
      ...lesson,
      chapterId,
    })),
  );

  const totalBank: Record<string, number> = {};

  lessons.forEach((lesson) => {
    Object.entries(lesson.questionTypes).forEach(([type, count]) => {
      totalBank[type] = (totalBank[type] || 0) + count;
    });
  });

  Object.entries(config).forEach(([type, totalQuestions]) => {
    const total = totalBank[type] || 0;

    lessons.forEach((lesson) => {
      const lessonBank = lesson.questionTypes[type] || 0;

      const share = Math.round((lessonBank / total) * totalQuestions);

      const level = splitLevels(lesson.difficultyLevels, share);

      const lessonDraft = newDraft[lesson.chapterId].lessons[lesson.id!];

      lessonDraft.matrix ??= {};
      lessonDraft.matrix[type] ??= {};

      Object.entries(level).forEach(([level, count]) => {
        lessonDraft.matrix[type][level] ??= 0;
        lessonDraft.matrix[type][level] += count;
      });

      
    });
  });

  return newDraft;
}
