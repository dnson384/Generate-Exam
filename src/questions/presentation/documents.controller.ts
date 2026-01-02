import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { DocumentService } from '../application/import-docx.usecase';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('document')
export class DocumentController {
  constructor(private readonly service: DocumentService) {}

  @Post('parse')
  @UseInterceptors(FileInterceptor('file'))
  async parseDocx(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('Vui lòng upload file');
    return await this.service.parseDocx(file);
  }
}
