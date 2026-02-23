import { Injectable } from '@nestjs/common';
import { IPracticeRepository } from '../domain/infrastructure/practice.repository';

@Injectable()
export class PracticesUseCase {
  constructor(private readonly repo: IPracticeRepository) {}

  async getPracticeById(id: string) {
    return await this.repo.getPracticeById(id);
  }
}
