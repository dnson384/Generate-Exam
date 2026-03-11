import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CategoriesDocument = HydratedDocument<Categories>;

@Schema({ _id: true })
export class LessonDataSch {
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ type: Object, default: {} })
  exerciseTypes: Record<string, number>;

  @Prop({ type: Object, default: {} })
  difficultyLevels: Record<string, number>;

  @Prop({ type: Object, default: {} })
  learningOutcomes: Record<string, number>;

  @Prop({ type: Object, default: {} })
  questionTypes: Record<string, number>;
}
const LessonDataSchema = SchemaFactory.createForClass(LessonDataSch);

@Schema({ collection: 'Categories', timestamps: true })
export class Categories {
  @Prop({ required: true })
  subject: string;

  @Prop({ required: true })
  chapter: string;

  @Prop({ type: [LessonDataSchema], default: [], required: true })
  lessons: LessonDataSch[];
}
export const CategoriesSchema = SchemaFactory.createForClass(Categories);
