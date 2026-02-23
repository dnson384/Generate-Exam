import { Injectable } from '@nestjs/common';
import { IPracticeRepository } from 'src/practices/domain/infrastructure/practice.repository';
import { NewPracticeDTO } from '../dtos/practices.dto';
import { PracticeEntity } from 'src/practices/domain/entities/practice.entity';

@Injectable()
export class PracticesServices {
  constructor(private readonly repo: IPracticeRepository) {}

  async insert(practice: NewPracticeDTO): Promise<string> {
    const newPracticeEntity: PracticeEntity = new PracticeEntity({
      title: practice.title,
      chapter: practice.chapter,
      questionsCount: practice.questionsCount,
      questionsId: practice.questionsId,
    });

    return await this.repo.savePractice(newPracticeEntity);
  }
}
