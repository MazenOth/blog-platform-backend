import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { Author, Post } from './models';
import { PostsModule } from './modules/posts/posts.module';
import { AuthorsModule } from './modules/authors/authors.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '3306', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [Author, Post],
      autoLoadModels: true,
      synchronize: true,
    }),
    PostsModule,
    AuthorsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
