import { PracticeDetailDTO } from 'src/practices/application/dtos/practices.dto';
import { PracticeEntity } from '../entities/practice.entity';

export abstract class IPracticeRepository {
  abstract savePractice(practice: PracticeEntity): Promise<string>;
  abstract getAllPractices(): Promise<PracticeEntity[]>;
  abstract getPracticeDetailById(id: string): Promise<PracticeDetailDTO>;
}
