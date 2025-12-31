import axios from "axios";

const baseUrl = `/api/uploadFile`;

export async function uploadDocxFile(formData: FormData) {
  const response = await axios.post(`${baseUrl}`, formData);
  return response.data;
}
