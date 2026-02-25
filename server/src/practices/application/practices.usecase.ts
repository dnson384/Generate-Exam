import { Injectable } from '@nestjs/common';
import { IPracticeRepository } from '../domain/infrastructure/practice.repository';

@Injectable()
export class PracticesUseCase {
  constructor(private readonly repo: IPracticeRepository) {}

  async getAllPractices() {
    return await this.repo.getAllPractices();
  }

  async getPracticeDetailById(id: string) {
    return await this.repo.getPracticeDetailById(id);
  }
}
