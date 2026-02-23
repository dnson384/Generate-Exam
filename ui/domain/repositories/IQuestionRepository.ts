import { GeneratePracticePayload } from "../entities/generate-practice.entity";

export interface IQuestionRepository {
  generatePractice(payload: GeneratePracticePayload): Promise<any>;
}
