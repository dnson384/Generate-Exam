import { ExtractedData } from "@/domain/entities/document.entity";
import { IUploadDocxFileRepository } from "@/domain/repositories/IUploadFileRepository";

export class uploadDocxFileUsecase {
  constructor(
    private readonly uploadDocxFileRepository: IUploadDocxFileRepository
  ) {}

  async execute(file: FormData): Promise<ExtractedData[]> {
    return this.uploadDocxFileRepository.uploadDocxFile(file);
  }
}
