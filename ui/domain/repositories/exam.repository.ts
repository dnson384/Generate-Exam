import { ExamExportPayloadEntity, ExamReponseEntity } from "../entities/exam.entity";

export interface IExamsRepository {
  generateExam(draftId: string): Promise<boolean>;
  getExamById(examId: string): Promise<ExamReponseEntity>;
  exportExamWordFile(payload: ExamExportPayloadEntity[],): Promise<Buffer>;
}
