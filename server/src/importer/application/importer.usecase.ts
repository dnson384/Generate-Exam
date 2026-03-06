import { Injectable } from '@nestjs/common';
import { IFileParser } from './ports/file-parser.port';
import { NewQuestionDTO } from 'src/questions/application/dtos/questions.dto';
import { NewCategoryDTO } from 'src/categories/application/dto/category.dto';
import { QuestionsServices } from 'src/questions/application/services/questions.services';
import { CategoriesServices } from 'src/categories/application/services/category.services';

@Injectable()
export class ImporterUseCase {
  constructor(
    private readonly questionsServices: QuestionsServices,
    private readonly categoriesServices: CategoriesServices,
    private readonly fileParser: IFileParser,
  ) {}

  async execute(fileBuffer: Buffer, subject: string): Promise<boolean> {
    if (subject.trim().length === 0) throw new Error('Không tồn tại môn học');
    if (!fileBuffer) throw new Error('File không tồn tại');

    const { questions, category } = await this.fileParser.parse(fileBuffer);

    const newCategoryDTO: NewCategoryDTO = {
      subject: subject,
      chapter: category.chapter,
      lessons: category.lessons,
    };

    const { chapterId, lessonId } =
      await this.categoriesServices.insert(newCategoryDTO);

    console.log(chapterId, lessonId)

    const newQuestionsDTO: NewQuestionDTO[] = questions.map((question) => ({
      subject: subject,
      chapterId: chapterId,
      lessonId: lessonId,
      exerciseType: question.exerciseType,
      difficultyLevel: question.difficultyLevel,
      learningOutcomes: question.learningOutcomes,
      questionType: question.questionType,
      question: question.question,
      options: question.options,
    }));

    await this.questionsServices.insert(newQuestionsDTO);

    return true;
  }
}
