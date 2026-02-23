import { PracticeDetailDTO } from 'src/practices/application/dtos/practices.dto';
import { PracticeEntity } from '../entities/practice.entity';

export abstract class IPracticeRepository {
  abstract savePractice(practice: PracticeEntity): Promise<string>;
  abstract getPracticeById(id: string): Promise<PracticeDetailDTO>;
}
