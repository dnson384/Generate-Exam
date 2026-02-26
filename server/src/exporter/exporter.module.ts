import { Module } from '@nestjs/common';
import { ExporterController } from './presentation/exporter.controller';
import { ExporterUsecase } from './application/exporter.usecase';

@Module({
  controllers: [ExporterController],
  providers: [ExporterUsecase],
})
export class ExporterModule {}
