import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ImportQuestionsUseCase } from '../application/import-questions.usecase';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('document')
export class DocumentController {
  constructor(private readonly importUseCase: ImportQuestionsUseCase) {}

  @Post('parse')
  @UseInterceptors(FileInterceptor('file'))
  async parseDocx(@UploadedFile() file: Express.Multer.File) {
    return await this.importUseCase.execute(file.buffer);
  }
}
