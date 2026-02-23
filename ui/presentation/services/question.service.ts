import axios from "axios";
import { GeneratePracticePayload } from "../schemas/generate-practice.schema";

export async function generatePracticeService(
  payload: GeneratePracticePayload,
): Promise<any> {
  const response = await axios.post("/api/question/generate-practice", payload);
  return response.data;
}
