import { PracticeDetailEntity } from "../entities/practice.entity";

export interface IPracticeRepository {
  getPracticeById(id: string): Promise<PracticeDetailEntity>;
}
