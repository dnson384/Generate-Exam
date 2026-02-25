import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IPracticeRepository } from 'src/practices/domain/infrastructure/practice.repository';
import { Practices, PracticesDocument } from '../models/practice.model';
import { PracticeEntity } from 'src/practices/domain/entities/practice.entity';
import { PracticeMapper } from '../mappers/practice.mapper';
import { PracticeDetailDTO } from 'src/practices/application/dtos/practices.dto';
import { QuestionMapper } from 'src/questions/infrastructure/database/mappers/questions.mapper';

@Injectable()
export class PracticeRepository implements IPracticeRepository {
  constructor(
    @InjectModel(Practices.name)
    private readonly PracticeModel: Model<PracticesDocument>,
  ) {}

  async savePractice(practice: PracticeEntity): Promise<string> {
    const practiceSchema = PracticeMapper.toSchema(practice);
    const result = await this.PracticeModel.create(practiceSchema);
    return result.id.toString();
  }

  async getAllPractices(): Promise<PracticeEntity[]> {
    const practices = await this.PracticeModel.find();

    if (practices.length === 0) throw Error('Chưa tồn tại đề ôn tập nào');

    const practicesDomain: PracticeEntity[] = practices.map((practice) =>
      PracticeMapper.toDomain(practice),
    );

    return practicesDomain;
  }

  async getPracticeDetailById(id: string): Promise<PracticeDetailDTO> {
    const practice =
      await this.PracticeModel.findById(id).populate('questionsId');

    if (!practice) throw Error('Không tồn tại đề ôn tập');

    let questionsDomain = practice.questionsId.map((q) =>
      QuestionMapper.toDomain(q as any),
    );

    const levelWeights: Record<string, number> = {
      'Nhận biết': 1,
      'Thông hiểu': 2,
      'Vận dụng': 3,
      'Vận dụng cao': 4,
    };

    questionsDomain.sort((a, b) => {
      if (a.exerciseType !== b.exerciseType) {
        return a.exerciseType.localeCompare(b.exerciseType);
      }

      if (a.lesson !== b.lesson) {
        return a.lesson.localeCompare(b.lesson);
      }

      const outcomeStrA = [...a.learningOutcomes].sort().join(' | ');
      const outcomeStrB = [...b.learningOutcomes].sort().join(' | ');
      if (outcomeStrA !== outcomeStrB) {
        return outcomeStrA.localeCompare(outcomeStrB);
      }

      const weightA = levelWeights[a.difficultyLevel];
      const weightB = levelWeights[b.difficultyLevel];

      return weightA - weightB;
    });

    const practiceDTO: PracticeDetailDTO = {
      title: practice.title,
      chapter: practice.chapter,
      questionsCount: practice.questionsCount,
      questions: questionsDomain,
    };

    return practiceDTO;
  }
}
