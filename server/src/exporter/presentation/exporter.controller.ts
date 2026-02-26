import { Controller, Post, Body, Res } from '@nestjs/common';
import type { Response } from 'express';
import { ExporterUsecase } from '../application/exporter.usecase';
import { ExportPayload } from './schemas/exporter.schema';
import { WordPayloadDTO } from '../application/dtos/exporter.dto';

@Controller('export')
export class ExporterController {
  constructor(private readonly exportService: ExporterUsecase) {}

  @Post('word')
  async exportToWord(@Body() payload: ExportPayload, @Res() res: Response) {
    const payloadDTO: WordPayloadDTO = {
      title: payload.title,
      questionsSorted: payload.questionsSorted,
    };
    const buffer = await this.exportService.generateWordFile(payloadDTO);

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    );
    res.setHeader('Content-Disposition', 'attachment; filename=De_Thi.docx');

    return res.send(buffer);
  }
}
