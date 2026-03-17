import { IExamsRepository } from "@/domain/repositories/exam.repository";

export class GetExamByIdUsecase {
  constructor(private readonly repo: IExamsRepository) {}

  async execute(examId: string): Promise<any> {
    return await this.repo.getExamById(examId);
  }
}
