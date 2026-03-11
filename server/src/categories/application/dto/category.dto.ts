export interface newLessonDataDTO {
  name: string;
  exerciseTypes:  { [name: string]: number }
  difficultyLevels:  { [name: string]: number }
  learningOutcomes:  { [name: string]: number }
  questionTypes:  { [name: string]: number }
}

export interface NewCategoryDTO {
  subject: string;
  chapter: string;
  lessons: newLessonDataDTO[];
}

export interface LessonDataDTO {
  id: string;
  name: string;
  exerciseTypes:  { [name: string]: number }
  difficultyLevels:  { [name: string]: number }
  learningOutcomes:  { [name: string]: number }
  questionTypes:  { [name: string]: number }
}

export interface CategoriesResponseDTO {
  id: string;
  subject: string;
  chapter: string;
  lessons: LessonDataDTO[];
}
