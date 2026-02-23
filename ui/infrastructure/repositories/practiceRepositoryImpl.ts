import axios from "axios";
import { IPracticeRepository } from "@/domain/repositories/IPracticeRepository";
import { PracticeDetailEntity } from "@/domain/entities/practice.entity";

export class PracticeRepositoryImpl implements IPracticeRepository {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl =
      process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_BACKEND_DEV_URL!
        : process.env.NEXT_PUBLIC_BACKEND_PROD_URL!;
  }

  async getPracticeById(id: string): Promise<PracticeDetailEntity> {
    const { data } = await axios.get<Promise<PracticeDetailEntity>>(
      `${this.baseUrl}/practice/${id}`,
    );
    return data;
  }
}
