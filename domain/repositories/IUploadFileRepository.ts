export interface IUploadDocxFileRepository {
  uploadDocxFile(file: FormData): Promise<string>;
}
