export interface ExamMatrixDetailDTO {
  chaperId: string;
  lessonId: string;
  exerciseType: string;
  difficultyLevel: string;
  learningOutcome: string;
  questionType: string;
  limit: number;
}

export interface ExamQuestionsResponseDTO {
  questionType: string;
  difficultyLevel: string;
  questionIds: string[];
}
