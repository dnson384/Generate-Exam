import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type PracticesDocument = HydratedDocument<Practices>;

@Schema({ collection: 'Practices', timestamps: true })
export class Practices {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  chapter: string;

  @Prop({ required: true })
  questionsCount: number;

  @Prop({
    type: [{ type: SchemaTypes.ObjectId, ref: 'Questions' }],
    default: [],
  })
  questionsId: Types.ObjectId[];
}
export const PracticesSchema = SchemaFactory.createForClass(Practices);
