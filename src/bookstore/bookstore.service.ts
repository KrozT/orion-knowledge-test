import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Book, BookDocument } from '@/bookstore/schemas/book.schema';
import { Author, AuthorDocument } from '@/bookstore/schemas/author.schema';

import { BookDto } from '@/bookstore/dto/book.dto';
import { AuthorDto } from '@/bookstore/dto/author.dto';

@Injectable()
export class BookstoreService {
  private readonly logger = new Logger(BookstoreService.name);

  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<BookDocument>,
    @InjectModel(Author.name)
    private readonly authorModel: Model<AuthorDocument>,
  ) {}

  async createBook(book: BookDto): Promise<BookDocument> {
    const authors = await Promise.all(
      book.authors.map(async (authorName) => {
        const author = await this.authorModel
          .findOne({ name: authorName })
          .exec();
        if (!author) {
          throw new NotFoundException(
            `Author with name "${authorName}" not found`,
          );
        }
        return author._id;
      }),
    );

    const createdBook = new this.bookModel({ ...book, authors });
    await createdBook.save();

    await Promise.all(
      authors.map(async (authorId) => {
        await this.authorModel.findByIdAndUpdate(authorId, {
          $addToSet: { books: createdBook._id },
        });
      }),
    );

    return createdBook;
  }

  async findAllBooks(): Promise<BookDocument[]> {
    return this.bookModel.find().exec();
  }

  async findBookById(id: string): Promise<BookDocument> {
    const book = await this.bookModel.findById(id).exec();

    if (!book) {
      throw new NotFoundException(`Book with ID "${id}" not found`);
    }
    return book;
  }

  async getBookAveragePagesPerChapter(
    id: string,
  ): Promise<{ id: string; average: number }> {
    const book = await this.bookModel.findById(id).exec();
    if (!book) {
      throw new NotFoundException(`Book with ID "${id}" not found`);
    }

    if (book.chapters === 0) {
      throw new HttpException(
        `Book with ID "${id}" has no chapters`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      id: book._id.toString(),
      average: parseFloat((book.pages / book.chapters).toFixed(2)),
    };
  }

  async createAuthor(authorDto: AuthorDto): Promise<AuthorDocument> {
    const existingAuthor = await this.authorModel
      .findOne({ name: authorDto.name })
      .exec();
    if (existingAuthor) {
      throw new HttpException(
        `Author with name "${authorDto.name}" already exists`,
        HttpStatus.CONFLICT,
      );
    }

    const createdAuthor = new this.authorModel(authorDto);
    return createdAuthor.save();
  }

  async findAllAuthors(): Promise<AuthorDocument[]> {
    return this.authorModel.find().exec();
  }

  async findAuthorById(id: string): Promise<AuthorDocument> {
    const author = await this.authorModel.findById(id).exec();

    if (!author) {
      throw new NotFoundException(`Author with ID "${id}" not found`);
    }
    return author;
  }

  async findAuthorBooks(id: string): Promise<BookDocument[]> {
    const author = await this.authorModel.findById(id).exec();
    if (!author) {
      throw new NotFoundException(`Author with ID "${id}" not found`);
    }
    return this.bookModel.find({ authors: author._id }).exec();
  }
}
