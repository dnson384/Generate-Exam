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

  async uploadDocxFile(formData: FormData): Promise<boolean> {
    const { data } = await axios.post<Promise<boolean>>(
      `${this.baseUrl}/importer/parse`,
      formData,
    );
    return data;
  }
}
