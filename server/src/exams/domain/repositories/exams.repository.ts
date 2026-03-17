import { ExamEntity } from '../entities/exam.entity';

export abstract class IExamsRepository {
  abstract saveExam(payload: ExamEntity): Promise<string>;
}
