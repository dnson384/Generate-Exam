import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';

export type QuestionsDocument = HydratedDocument<Questions>;

@Schema({ _id: false })
export class QuestionContent {
  @Prop({ required: true })
  template: string;

  @Prop({
    type: {
      math: { type: SchemaTypes.Mixed, default: {} },
      image: { type: SchemaTypes.Mixed, default: {} },
    },
    required: true,
    _id: false,
  })
  variables: {
    math: Record<string, string>;
    image: Record<string, string>;
  };
}
const QuestionContentSchema = SchemaFactory.createForClass(QuestionContent);

@Schema({ _id: false })
export class Options {
  @Prop({ required: true })
  template: string;

  @Prop({
    type: {
      math: { type: SchemaTypes.Mixed, default: {} },
      image: { type: SchemaTypes.Mixed, default: {} },
    },
    required: true,
    _id: false,
  })
  variables: {
    math: Record<string, string>;
    image: Record<string, string>;
  };
}
const OptionsSchema = SchemaFactory.createForClass(Options);

@Schema({ collection: 'Questions', timestamps: true })
export class Questions {
  @Prop({ required: true })
  chapter: string;

  @Prop({ required: true })
  lesson: string;

  @Prop({ required: true })
  exerciseType: string;

  @Prop({ required: true })
  difficultyLevel: string;

  @Prop({ type: [String], default: [] })
  learningOutcomes: string[];

  @Prop({ required: true })
  questionType: string;

  @Prop({ type: QuestionContentSchema, required: true })
  question: QuestionContent;

  @Prop({ type: [OptionsSchema], default: [] })
  options: Options[];
}
export const QuestionsSchema = SchemaFactory.createForClass(Questions);
