import {
  ExamReponseEntity,
  QuestionDetail,
} from "@/domain/entities/exam.entity";

export type TransformedExamUI = {
  [questionType: string]: QuestionDetail[];
};

export function transformExamResToUI(rawData: ExamReponseEntity) {
  return rawData.groups.reduce((acc, group) => {
    const type = group.questionType;
    const level = group.difficultyLevel;

    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(...group.questions);

    return acc;
  }, {} as TransformedExamUI);
}
