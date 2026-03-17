import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type ExamsDocument = HydratedDocument<Exams>;

@Schema({ _id: false })
export class ChapterExamSch {
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Categories',
    required: true,
  })
  id: Types.ObjectId;

  @Prop({ type: [{ type: SchemaTypes.ObjectId }], default: [] })
  lessonIds: Types.ObjectId[];
}

const ChapterExamSchema = SchemaFactory.createForClass(ChapterExamSch);

@Schema({ _id: false })
export class QuestionExamSch {
  @Prop({ type: String, required: true })
  questionType: string;

  @Prop({ type: String, required: true })
  difficultyLevel: string;

  @Prop({
    type: [{ type: SchemaTypes.ObjectId, ref: 'Questions' }],
    default: [],
  })
  questionIds: Types.ObjectId[];
}

const QuestionExamSchema = SchemaFactory.createForClass(QuestionExamSch);

@Schema({ collection: 'Exams', timestamps: true })
export class Exams {
  @Prop({ type: [ChapterExamSchema], default: [] })
  chapters: ChapterExamSch[];

  @Prop({ type: [QuestionExamSchema], default: [] })
  questions: QuestionExamSch[];
}
export const ExamsSchema = SchemaFactory.createForClass(Exams);
