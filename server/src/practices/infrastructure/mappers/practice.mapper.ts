import { Types } from 'mongoose';
import { Practices, PracticesDocument } from '../models/practice.model';
import { PracticeEntity } from 'src/practices/domain/entities/practice.entity';

export class PracticeMapper {
  static toDomain(raw: PracticesDocument): PracticeEntity {
    const entity = new PracticeEntity({
      id: raw._id.toString(),
      title: raw.title,
      chapter: raw.chapter,
      questionsCount: raw.questionsCount,
      questionsId: raw.questionsId.map((id) => id.toString()),
      createdAt: (raw as any).createdAt,
      updatedAt: (raw as any).createdAt,
    });
    return entity;
  }

  static toSchema(entity: PracticeEntity): Partial<Practices> {
    return {
      title: entity.title,
      chapter: entity.chapter,
      questionsCount: entity.questionsCount,
      questionsId: entity.questionsId.map((id) => new Types.ObjectId(id)),
    };
  }
}
