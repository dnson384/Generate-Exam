import { ExamReponseEntity } from "@/domain/entities/exam.entity";
import axios from "axios";
import { ExamExportPayload } from "../schemas/export.schema";

export async function GenerateExamService(draftId: string): Promise<boolean> {
  const response = await axios.post<boolean>(`/api/exam/generate`, {
    draftId: draftId,
  });

  return response.data;
}

export async function GetExamService(
  examId: string,
): Promise<ExamReponseEntity> {
  const response = await axios.get<ExamReponseEntity>(`/api/exam`, {
    params: {
      examId: examId,
    },
  });

  return response.data;
}

export async function exportWordFileService(payload: ExamExportPayload) {
  const response = await axios.post("/api/exam/export", payload, {
    responseType: "blob",
  });

  return response.data;
}
