import { ExtractedData } from "@/domain/entities/document.entity";
import { IUploadDocxFileRepository } from "@/domain/repositories/IUploadFileRepository";
import axios from "axios";

export class UploadDocxFileRepositoryImpl implements IUploadDocxFileRepository {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl =
      process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_BACKEND_DEV_URL!
        : process.env.NEXT_PUBLIC_BACKEND_PROD_URL!;
  }

  async uploadDocxFile(formData: FormData): Promise<ExtractedData[]> {
    const { data } = await axios.post<Promise<ExtractedData[]>>(
      `${this.baseUrl}/document/parse`,
      formData,
    );
    return data;
  }
}
