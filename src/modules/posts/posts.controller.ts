import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  BadRequestException,
  NotFoundException,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as BlogPost } from '../../models';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll(
    @Query('search') search?: string,
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ): Promise<{ posts: BlogPost[]; totalPosts: number }> {
    try {
      return await this.postsService.findAll(search, page, limit);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<BlogPost> {
    try {
      const post = await this.postsService.findOne(id);
      if (!post) throw new NotFoundException('Post not found');
      return post;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() postDto: CreatePostDto): Promise<BlogPost> {
    try {
      return await this.postsService.create(postDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
