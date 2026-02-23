import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PracticesServices } from './application/services/practices.service';
import { IPracticeRepository } from './domain/infrastructure/practice.repository';
import { PracticeRepository } from './infrastructure/repositories/practice.repository';
import {
  Practices,
  PracticesSchema,
} from './infrastructure/models/practice.model';
import { PracticesController } from './presentation/practices.controller';
import { PracticesUseCase } from './application/practices.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Practices.name, schema: PracticesSchema },
    ]),
  ],
  controllers: [PracticesController],
  providers: [
    PracticesServices,
    PracticesUseCase,
    { provide: IPracticeRepository, useClass: PracticeRepository },
  ],
  exports: [PracticesServices],
})
export class PracticesModule {}
