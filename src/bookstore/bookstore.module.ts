import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BookstoreService } from '@/bookstore/bookstore.service';
import { BookstoreController } from '@/bookstore/bookstore.controller';
import { Book, BookSchema } from '@/bookstore/schemas/book.schema';
import { Author, AuthorSchema } from '@/bookstore/schemas/author.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Book.name, schema: BookSchema },
      { name: Author.name, schema: AuthorSchema },
    ]),
  ],
  providers: [BookstoreService],
  controllers: [BookstoreController],
})
export class BookstoreModule {}
