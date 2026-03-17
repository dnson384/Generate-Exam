import { ChapterDraft } from 'src/draft/domain/entities/draft.entity';

export default function matrixDetailsQuestionsCount(
  chapterData: ChapterDraft[],
  questionsCount: number,
): boolean {
  let currentTotalQuestions = 0;

  chapterData.forEach((chapter) => {
    chapter.lessons.forEach((lesson) => {
      if (lesson.matrixDetails && lesson.matrixDetails.length > 0) {
        lesson.matrixDetails.forEach((detailItem) => {
          currentTotalQuestions += detailItem.selectedCount || 0;
        });
      }
    });
  });

  return currentTotalQuestions >= questionsCount;
}
