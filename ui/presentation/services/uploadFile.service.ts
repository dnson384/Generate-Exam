import axios from "axios";

export async function uploadDocxFile(formData: FormData): Promise<boolean> {
  const response = await axios.post<boolean>("/api/uploadFile", formData);
  return response.data;
}
