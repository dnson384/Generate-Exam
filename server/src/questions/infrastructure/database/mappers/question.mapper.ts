import { QuestionEntity } from 'src/questions/domain/entities/question.entity';
import { Questions, QuestionsDocument } from '../schemas/question.model';

export class QuestionMapper {
  static toDomain(raw: QuestionsDocument): QuestionEntity {
    const entity = new QuestionEntity({
      id: raw._id.toString(),
      chapter: raw.chapter,
      lesson: raw.lesson,
      category: raw.category,
      level: raw.level,
      learningOutcome: raw.learningOutcome,
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
      chapter: entity.chapter,
      lesson: entity.lesson,
      category: entity.category,
      level: entity.level,
      learningOutcome: entity.learningOutcome,
      questionType: entity.questionType,
      question: entity.question,
      options: entity.options,
    };
  }
}
