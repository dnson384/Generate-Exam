import { IExamsRepository } from "@/domain/repositories/exam.repository";

export class GenerateExamUsecase {
  constructor(private readonly repo: IExamsRepository) {}

  async execute(draftId: string): Promise<boolean> {
    return await this.repo.generateExam(draftId);
  }
}
