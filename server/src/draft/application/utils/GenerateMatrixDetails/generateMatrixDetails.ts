import {
  CategoryEntity,
  LessonDataEntity,
} from 'src/categories/domain/entities/category.entity';
import {
  LessonDraft,
  MatrixDetailItem,
} from 'src/draft/domain/entities/draft.entity';

export function generateMatrixDetailsUtil(
  categories: CategoryEntity[],
  allDraftLessons: LessonDraft[],
) {
  const cateMap = new Map<string, LessonDataEntity>();
  categories.forEach((cate) => {
    cate.lessons.forEach((lesson) => {
      cateMap.set(lesson.id!, lesson);
    });
  });

  for (const lessonDraft of allDraftLessons) {
    const lessonData = cateMap.get(lessonDraft.id!);
    if (!lessonData || !lessonData.bankStats) continue;

    const matrixDetails: MatrixDetailItem[] = [];

    const allQTypes = Array.from(
      new Set(lessonDraft.matrix.map((m) => m.questionType)),
    );

    const uniqueCombos = new Set<string>();
    lessonData.bankStats.forEach((stat) => {
      stat.difficultyLevels.forEach((diff) => {
        stat.learningOutcomes.forEach((outcome) => {
          const key = JSON.stringify({
            e: stat.exerciseType,
            d: diff,
            o: outcome,
          });
          uniqueCombos.add(key);
        });
      });
    });

    uniqueCombos.forEach((key) => {
      const combo = JSON.parse(key);
      allQTypes.forEach((qType) => {
        matrixDetails.push({
          exerciseType: combo.e,
          difficultyLevel: combo.d,
          learningOutcome: combo.o,
          questionType: qType,
          selectedCount: 0,
        });
      });
    });

    for (const matrixItem of lessonDraft.matrix) {
      const candidates = lessonData.bankStats
        .filter(
          (stat) =>
            stat.questionType === matrixItem.questionType &&
            stat.difficultyLevels.includes(matrixItem.difficultyLevel) &&
            stat.count > 0,
        )
        .map((m) => ({ bank: m, remaining: m.count }));
      if (!candidates.length) continue;

      let needed = matrixItem.selectedCount;
      let index = 0;

      while (needed > 0) {
        const c = candidates[index];

        if (c.remaining > 0) {
          c.remaining--;
          needed--;

          const randomOutcome =
            c.bank.learningOutcomes[
              Math.floor(Math.random() * c.bank.learningOutcomes.length)
            ];

          const detailItem = matrixDetails.find(
            (d) =>
              d.exerciseType === c.bank.exerciseType &&
              d.difficultyLevel === matrixItem.difficultyLevel &&
              d.learningOutcome === randomOutcome &&
              d.questionType === matrixItem.questionType,
          );

          if (detailItem) {
            detailItem.selectedCount++;
          }
        }

        index = (index + 1) % candidates.length;

        if (candidates.every((x) => x.remaining === 0)) break;
      }
    }
    lessonDraft.matrixDetails = matrixDetails;
  }
}
