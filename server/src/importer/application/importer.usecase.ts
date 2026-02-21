import { Injectable } from '@nestjs/common';
import { IFileParser } from './ports/file-parser.port';
import { CategoriesUseCase } from 'src/categories/application/category.usecase';
import { QuestionsUseCase } from 'src/questions/application/questions.usecase';
import { NewQuestionDTO } from 'src/questions/application/dtos/questions.dto';
import { NewCategoryDTO } from 'src/categories/application/dto/category.dto';

@Injectable()
export class ImporterUseCase {
  constructor(
    private readonly questionsUsecase: QuestionsUseCase,
    private readonly categoriesUsecase: CategoriesUseCase,
    private readonly fileParser: IFileParser,
  ) {}

  async execute(fileBuffer: Buffer): Promise<boolean> {
    if (!fileBuffer) throw new Error('File không tồn tại');
    const { questions, category } = await this.fileParser.parse(fileBuffer);

    const newQuestionsDTO: NewQuestionDTO[] = questions.map((question) => ({
      chapter: question.chapter,
      lesson: question.lesson,
      exerciseType: question.exerciseType,
      difficultyLevel: question.difficultyLevel,
      learningOutcomes: question.learningOutcomes,
      questionType: question.questionType,
      question: question.question,
      options: question.options,
    }));

    const newCategoryDTO: NewCategoryDTO = {
      chapter: category.chapter,
      lessons: category.lessons,
    };
    
    return (
      (await this.questionsUsecase.insert(newQuestionsDTO)) &&
      (await this.categoriesUsecase.insert(newCategoryDTO))
    );
  }
}
