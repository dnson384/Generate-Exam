import { ExtractedData } from "@/domain/entities/document.entity";
import axios from "axios";

const baseUrl = `/api/uploadFile`;

export async function uploadDocxFile(
  formData: FormData
): Promise<ExtractedData[]> {
  const response = await axios.post(`${baseUrl}`, formData);
  return response.data;
}
