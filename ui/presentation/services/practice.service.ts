import { PracticeDetailEntity } from "@/domain/entities/practice.entity";
import axios from "axios";

export async function getPracticeByIdService(
  id: string,
): Promise<PracticeDetailEntity> {
  const response = await axios.get("/api/practice", {
    params: { id: id },
  });
  return response.data;
}
