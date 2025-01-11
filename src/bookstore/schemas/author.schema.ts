import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { Book } from '@/bookstore/schemas/book.schema';

export type AuthorDocument = HydratedDocument<Author>;

@Schema()
export class Author {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Book' }] })
  books: Book[];
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
