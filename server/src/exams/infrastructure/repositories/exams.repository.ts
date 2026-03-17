import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { ExamEntity } from 'src/exams/domain/entities/exam.entity';
import { IExamsRepository } from 'src/exams/domain/repositories/exams.repository';

import { Exams, ExamsDocument } from '../schemas/exam.schema';
import { ExamMapper } from '../mappers/exam.mapper';

@Injectable()
export class ExamsRepositoryImpl implements IExamsRepository {
  constructor(
    @InjectModel(Exams.name)
    private readonly model: Model<ExamsDocument>,
  ) {}

  async saveExam(payload: ExamEntity): Promise<string> {
    const payloadSch = ExamMapper.toSchema(payload);
    const createdExam = await this.model.create(payloadSch);
    return createdExam._id.toString();
  }

  async
}
