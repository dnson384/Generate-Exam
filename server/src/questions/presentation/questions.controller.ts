import { Controller } from '@nestjs/common';
import { QuestionsUseCase } from 'src/questions/application/questions.usecase';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsUseCase: QuestionsUseCase) {}

  // @Post('parse')
  // @UseInterceptors(FileInterceptor('file'))
  // async parseDocx(@UploadedFile() file: Express.Multer.File) {
  //   return await this.importUseCase.execute(file.buffer);
  // }
}
