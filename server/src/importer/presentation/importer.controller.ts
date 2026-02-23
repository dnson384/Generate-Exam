import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ImporterUseCase } from '../application/importer.usecase';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('importer')
export class ImporterController {
  constructor(private readonly importUseCase: ImporterUseCase) {}

  @Post('parse')
  @UseInterceptors(FileInterceptor('file'))
  async parseDocx(@UploadedFile() file: Express.Multer.File) {
    return await this.importUseCase.execute(file.buffer);
  }
}
