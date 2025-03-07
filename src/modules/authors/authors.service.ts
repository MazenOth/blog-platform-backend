import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Author } from '../../models';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectModel(Author)
    private authorModel: typeof Author,
  ) {}

  async findAll(): Promise<Author[]> {
    try {
      return await this.authorModel.findAll();
    } catch (error) {
      throw new Error(`Error fetching authors: ${error.message}`);
    }
  }

  async create(data: Partial<Author>): Promise<Author> {
    try {
      return await this.authorModel.create(data);
    } catch (error) {
      throw new Error(`Error creating author: ${error.message}`);
    }
  }
}
