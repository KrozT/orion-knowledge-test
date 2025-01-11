import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BookstoreService } from '@/bookstore/bookstore.service';

import { BookDto } from '@/bookstore/dto/book.dto';
import { AuthorDto } from '@/bookstore/dto/author.dto';

@Controller('bookstore')
export class BookstoreController {
  constructor(private readonly bookstoreService: BookstoreService) {}

  @Post('book')
  async createBook(@Body() book: BookDto) {
    return this.bookstoreService.createBook(book);
  }

  @Get('books')
  async findAllBooks() {
    return this.bookstoreService.findAllBooks();
  }

  @Get('book/:id')
  async findBookById(@Param('id') id: string) {
    return this.bookstoreService.findBookById(id);
  }

  @Get('book/:id/average-pages-per-chapter')
  async getBookChapterAveragePages(@Param('id') id: string) {
    return this.bookstoreService.getBookAveragePagesPerChapter(id);
  }

  @Post('author')
  async createAuthor(@Body() author: AuthorDto) {
    return this.bookstoreService.createAuthor(author);
  }

  @Get('authors')
  async findAllAuthors() {
    return this.bookstoreService.findAllAuthors();
  }

  @Get('author/:id')
  async findAuthorById(@Param('id') id: string) {
    return this.bookstoreService.findAuthorById(id);
  }

  @Get('author/:id/books')
  async findAuthorBooks(@Param('id') id: string) {
    return this.bookstoreService.findAuthorBooks(id);
  }
}
