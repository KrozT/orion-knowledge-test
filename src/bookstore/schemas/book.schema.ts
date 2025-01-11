import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { Author } from '@/bookstore/schemas/author.schema';

export type BookDocument = HydratedDocument<Book>;

@Schema()
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  chapters: number;

  @Prop({ required: true })
  pages: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Author' }] })
  authors: Author[];
}

export const BookSchema = SchemaFactory.createForClass(Book);
