import {
  ExamExportPayloadEntity,
  ExamReponseEntity,
} from "@/domain/entities/exam.entity";
import { IExamsRepository } from "@/domain/repositories/exam.repository";
import axios from "axios";

export class ExamsRepositoryImpl implements IExamsRepository {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl =
      process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_BACKEND_DEV_URL!
        : process.env.NEXT_PUBLIC_BACKEND_PROD_URL!;
  }

  async generateExam(draftId: string): Promise<boolean> {
    const { data } = await axios.post<boolean>(
      `${this.baseUrl}/exam/generate`,
      { draftId },
    );
    return data;
  }

  async getExamById(examId: string): Promise<ExamReponseEntity> {
    const { data } = await axios.get<ExamReponseEntity>(
      `${this.baseUrl}/exam/${examId}`,
    );

    return data;
  }

  async exportExamWordFile(
    payload: ExamExportPayloadEntity[],
  ): Promise<Buffer> {
    const { data } = await axios.post<Buffer>(
      `${this.baseUrl}/exam/export`,
      payload,
      {
        responseType: "arraybuffer",
      },
    );

    return data;
  }
}
