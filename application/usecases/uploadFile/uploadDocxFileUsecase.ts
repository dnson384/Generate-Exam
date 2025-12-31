import { IUploadDocxFileRepository } from "@/domain/repositories/IUploadFileRepository";

export class uploadDocxFileUsecase {
  constructor(private readonly uploadDocxFileRepository: IUploadDocxFileRepository) {}

  async execute(file: FormData): Promise<string> {
    return this.uploadDocxFileRepository.uploadDocxFile(file);
  }
}
