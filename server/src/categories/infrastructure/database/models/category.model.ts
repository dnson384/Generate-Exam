import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoriesDocument = HydratedDocument<Categories>;

@Schema({ _id: false })
export class LessonData {
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
const LessonDataSchema = SchemaFactory.createForClass(LessonData);

@Schema({ collection: 'Categories', timestamps: true })
export class Categories {
  @Prop({ required: true })
  chapter: string;

  @Prop({ type: [LessonDataSchema], default: [], required: true })
  lessons: LessonData[];
}
export const CategoriesSchema = SchemaFactory.createForClass(Categories);
