import axios from "axios";

export async function uploadDocxFile(
  formData: FormData,
): Promise<boolean> {
  const response = await axios.post("/api/uploadFile", formData);
  return response.data;
}
