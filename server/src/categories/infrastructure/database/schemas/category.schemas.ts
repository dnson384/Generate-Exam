import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CategoriesDocument = HydratedDocument<Categories>;

@Schema({ _id: true })
export class LessonDataSch {
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ type: [String], default: [] })
  exerciseTypes: string[];

  @Prop({ type: [String], default: [] })
  difficultyLevels: string[];

  @Prop({ type: [String], default: [] })
  learningOutcomes: string[];

  @Prop({ type: [String], default: [] })
  questionTypes: string[];
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
