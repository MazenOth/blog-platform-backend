import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Post, Author } from '../../models';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post)
    private postModel: typeof Post,
  ) {}

  async findAll(
    search?: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ posts: Post[]; totalPosts: number }> {
    try {
      const offset = (page - 1) * limit;

      const whereClause = search
        ? {
            [Op.or]: [
              { title: { [Op.like]: `%${search}%` } },
              { content: { [Op.like]: `%${search}%` } },
              { '$author.name$': { [Op.like]: `%${search}%` } },
            ],
          }
        : {};

      const { rows: posts, count: totalPosts } =
        await this.postModel.findAndCountAll({
          where: whereClause,
          limit,
          offset,
          attributes: [
            'id',
            'title',
            'content',
            [Sequelize.col('author.name'), 'authorName'],
          ],
          include: [
            {
              model: Author,
              as: 'author',
              attributes: [],
            },
          ],
          order: [['createdAt', 'DESC']],
        });

      return { posts, totalPosts };
    } catch (error) {
      throw new Error(`Error fetching posts: ${error.message}`);
    }
  }

  async findOne(id: number): Promise<Post | null> {
    try {
      const post = await this.postModel.findByPk(id, {
        attributes: [
          'id',
          'title',
          'content',
          [Sequelize.col('author.name'), 'authorName'],
        ],
        include: [
          {
            model: Author,
            as: 'author',
            attributes: [],
          },
        ],
      });
      if (!post) throw new Error('Post not found');
      return post;
    } catch (error) {
      throw new Error(`Error fetching post details: ${error.message}`);
    }
  }

  async create(data: Partial<Post>): Promise<Post> {
    try {
      return this.postModel.create(data);
    } catch (error) {
      throw new Error(`Error creating post: ${error.message}`);
    }
  }
}
