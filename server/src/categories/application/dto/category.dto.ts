export interface newLessonDataDTO {
  name: string;
  exerciseTypes: string[];
  difficultyLevels: string[];
  learningOutcomes: string[];
  questionTypes: string[];
}

export interface NewCategoryDTO {
  subject: string;
  chapter: string;
  lessons: newLessonDataDTO[];
}

export interface LessonDataDTO {
  id: string;
  name: string;
  exerciseTypes: string[];
  difficultyLevels: string[];
  learningOutcomes: string[];
  questionTypes: string[];
}

export interface CategoriesResponseDTO {
  id: string;
  subject: string;
  chapter: string;
  lessons: LessonDataDTO[];
}
