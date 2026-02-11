import { QuestionEntity } from '../../domain/entities/question.entity';
import { CategoryEntity } from '../../domain/entities/category.entity';

export class ParsedDataOutput {
  questions: QuestionEntity[];
  category: CategoryEntity;
}
