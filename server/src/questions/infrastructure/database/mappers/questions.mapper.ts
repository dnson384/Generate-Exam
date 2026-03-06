import { QuestionEntity } from 'src/questions/domain/entities/question.entity';
import { Questions, QuestionsDocument } from '../schemas/questions.schema';

export class QuestionMapper {
  static toDomain(raw: QuestionsDocument): QuestionEntity {
    const entity = new QuestionEntity({
      id: raw._id.toString(),
      chapterId: raw.chapterId,
      lessonId: raw.lessonId,
      exerciseType: raw.exerciseType,
      difficultyLevel: raw.difficultyLevel,
      learningOutcomes: raw.learningOutcomes,
      questionType: raw.questionType,
      question: raw.question,
      options: raw.options,
      createdAt: (raw as any).createdAt,
      updatedAt: (raw as any).createdAt,
    });
    return entity;
  }

  static toSchema(entity: QuestionEntity): Partial<Questions> {
    return {
      subject: entity.subject,
      chapterId: entity.chapterId,
      lessonId: entity.lessonId,
      exerciseType: entity.exerciseType,
      difficultyLevel: entity.difficultyLevel,
      learningOutcomes: entity.learningOutcomes,
      questionType: entity.questionType,
      question: entity.question,
      options: entity.options,
    };
  }
}
