import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export class BookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @Min(1, { message: 'Chapters must be greater than 0' })
  chapters: number;

  @IsNumber()
  @Min(1, { message: 'Pages must be greater than 0' })
  pages: number;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsString({ each: true })
  authors: string[];
}
