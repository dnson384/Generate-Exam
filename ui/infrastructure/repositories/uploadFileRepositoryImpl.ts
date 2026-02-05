import { ExtractedData } from "@/domain/entities/document.entity";
import { IUploadDocxFileRepository } from "@/domain/repositories/IUploadFileRepository";
import axios from "axios";

export class UploadDocxFileRepositoryImpl implements IUploadDocxFileRepository {
  constructor(
    private readonly baseUrl: string = process.env.BACKEND_URL || ""
  ) {}

  async uploadDocxFile(formData: FormData): Promise<ExtractedData[]> {
    const { data } = await axios.post<Promise<ExtractedData[]>>(
      `${this.baseUrl}/document/parse`,
      formData
    );
    return data;
  }
}
