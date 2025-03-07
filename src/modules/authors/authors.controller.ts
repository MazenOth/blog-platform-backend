import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { Author } from '../../models';
import { CreateAuthorDto } from './dto';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  async findAll(): Promise<Author[]> {
    try {
      return await this.authorsService.findAll();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() author: CreateAuthorDto): Promise<Author> {
    try {
      return await this.authorsService.create(author);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
