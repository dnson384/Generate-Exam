import { ChapterDraft } from 'src/draft/domain/entities/draft.entity';

export default function matrixQuestionsCount(
  chapterData: ChapterDraft[],
  questionsCount: number,
) {
  let currentTotalQuestions = 0;

  chapterData.forEach((chapter) => {
    chapter.lessons.forEach((lesson) => {
      if (lesson.matrix && lesson.matrix.length > 0) {
        lesson.matrix.forEach((matrixItem) => {
          currentTotalQuestions += matrixItem.selectedCount || 0;
        });
      }
    });
  });
  return currentTotalQuestions >= questionsCount;
}
