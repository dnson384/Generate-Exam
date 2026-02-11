import { ExtractedData } from "@/domain/entities/document.entity";
import axios from "axios";

export async function uploadDocxFile(
  formData: FormData,
): Promise<ExtractedData[]> {
  const response = await axios.post("/api/uploadFile", formData);
  return response.data;
}
