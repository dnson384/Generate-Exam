import { ExtractedData } from "../entities/document.entity";

export interface IUploadDocxFileRepository {
  uploadDocxFile(file: FormData): Promise<ExtractedData[]>;
}
