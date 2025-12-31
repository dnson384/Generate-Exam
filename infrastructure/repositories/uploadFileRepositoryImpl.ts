import { IUploadDocxFileRepository } from "@/domain/repositories/IUploadFileRepository";
import axios from "axios";

export class UploadDocxFileRepositoryImpl implements IUploadDocxFileRepository {
  constructor(
    private readonly baseUrl: string = process.env.BACKEND_URL || ""
  ) {}

  async uploadDocxFile(formData: FormData): Promise<string> {
    const { data } = await axios.post(
      `${this.baseUrl}/document/parse`,
      formData
    );
    return data;
  }
}
