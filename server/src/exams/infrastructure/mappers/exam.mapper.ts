import { ExamEntity } from 'src/exams/domain/entities/exam.entity';
import { Exams, ExamsDocument } from '../schemas/exam.schema';
import { Types } from 'mongoose';

export class ExamMapper {
  static toDomain(raw: ExamsDocument) {}
  static toSchema(entity: ExamEntity): Partial<Exams> {
    return {
      chapters: entity.chapters.map((c) => ({
        id: new Types.ObjectId(c.id),
        lessonIds: c.lessonIds.map((id) => new Types.ObjectId(id)),
      })),
      questions: entity.questions.map((q) => ({
        questionType: q.questionType,
        difficultyLevel: q.difficultyLevel,
        questionIds: q.questionIds.map((id) => new Types.ObjectId(id)),
      })),
    };
  }
}
