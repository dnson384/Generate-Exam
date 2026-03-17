import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type DraftDocument = HydratedDocument<Drafts>;

@Schema({ _id: false })
export class MatrixItemSch {
  @Prop({ type: String, required: true })
  questionType: string;

  @Prop({ type: String, required: true })
  difficultyLevel: string;

  @Prop({ type: Number, required: true })
  selectedCount: number;
}
const MatrixItemSchema = SchemaFactory.createForClass(MatrixItemSch);

@Schema({ _id: false })
export class MatrixDetailItemSch {
  @Prop({ type: String, required: true })
  exerciseType: string;

  @Prop({ type: String, required: true })
  difficultyLevel: string;

  @Prop({ type: String, required: true })
  learningOutcome: string;

  @Prop({ type: String, required: true })
  questionType: string;

  @Prop({ type: Number, required: true })
  selectedCount: number;
}
const MatrixDetailItemSchema =
  SchemaFactory.createForClass(MatrixDetailItemSch);

@Schema({ _id: false, minimize: false })
export class LessonDraftSch {
  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
  })
  id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ type: [MatrixItemSchema], default: [] })
  matrix: MatrixItemSch[];

  @Prop({ type: [MatrixDetailItemSchema], default: [] })
  matrixDetails: MatrixDetailItemSch[];
}
const LessonDraftSchema = SchemaFactory.createForClass(LessonDraftSch);

@Schema({ _id: false })
export class ChapterDraftSch {
  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
  })
  id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ type: [LessonDraftSchema], default: {} })
  lessons: LessonDraftSch[];
}
const ChapterDraftSchema = SchemaFactory.createForClass(ChapterDraftSch);

@Schema({ collection: 'Draft', timestamps: true })
export class Drafts {
  @Prop({ required: true })
  questionsCount: number;

  @Prop({ type: [String], required: true })
  questionTypes: string[];

  @Prop({ type: [ChapterDraftSchema], default: [] })
  chapters: ChapterDraftSch[];
}
export const DraftSchema = SchemaFactory.createForClass(Drafts);
