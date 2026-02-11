import { Injectable } from '@nestjs/common';
import { IFileParser } from './ports/file-parser.port';
import { IQuestionRepository } from '../domain/repositories/question.repository';
import { ICategoriesRepository } from '../domain/repositories/category.repository';

@Injectable()
export class ImportQuestionsUseCase {
  constructor(
    private readonly questionRepo: IQuestionRepository,
    private readonly categoryRepo: ICategoriesRepository,
    private readonly fileParser: IFileParser,
  ) {}

  async execute(fileBuffer: Buffer): Promise<boolean> {
    if (!fileBuffer) throw new Error('File không tồn tại');
    const { questions, category } = await this.fileParser.parse(fileBuffer);
    return (
      (await this.questionRepo.saveQuestions(questions)) &&
      (await this.categoryRepo.saveCategory(category))
    );
  }
}
