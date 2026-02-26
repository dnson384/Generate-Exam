import axios from "axios";
import { GeneratePracticePayload } from "../schemas/generatePractice.schema";

export async function generatePracticeService(
  payload: GeneratePracticePayload,
): Promise<string> {
  const response = await axios.post<string>(
    "/api/question/generatePractice",
    payload,
  );
  return response.data;
}
