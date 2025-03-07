import { IsNotEmpty, IsString, Length } from 'class-validator';
import { Transform } from 'class-transformer';
import { sanitizeInput } from 'src/utils/sanitize';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 100, { message: 'Title must be between 3 and 100 characters' })
  @Transform(({ value }) => sanitizeInput(value))
  title: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 2000, {
    message: 'Content must be between 10 and 2000 characters',
  })
  @Transform(({ value }) => sanitizeInput(value))
  content: string;

  @IsNotEmpty()
  authorId: number;
}
