import { IsString, Length } from 'class-validator';
import { Transform } from 'class-transformer';
import { sanitizeInput } from 'src/utils/sanitize';

export class CreateAuthorDto {
  @IsString()
  @Length(3, 100, {
    message: 'Author name must be between 3 and 100 characters',
  })
  @Transform(({ value }) => sanitizeInput(value))
  name: string;

  @IsString()
  @Length(5, 255, { message: 'Bio must be between 5 and 255 characters' })
  @Transform(({ value }) => sanitizeInput(value))
  bio: string;
}
