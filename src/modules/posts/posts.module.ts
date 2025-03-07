import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Post, Author } from '../../models';

@Module({
  imports: [SequelizeModule.forFeature([Post, Author])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
