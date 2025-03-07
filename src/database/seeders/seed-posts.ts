import { NestFactory } from '@nestjs/core';
import { Sequelize } from 'sequelize-typescript';
import { AppModule } from '../../app.module';
import { Post, Author } from '../../models';
import { faker } from '@faker-js/faker';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const sequelize = app.get(Sequelize);

  console.log('Seeding database...');

  const existingAuthors = await Author.findAll();
  let authors = existingAuthors;

  if (existingAuthors.length === 0) {
    console.log('Creating 10 authors...');
    authors = await Author.bulkCreate(
      Array.from({ length: 10 }, () => ({
        name: faker.person.fullName(),
        bio: faker.lorem.sentence(),
      })),
    );
  }

  const authorIds = authors.map((a) => a.id);

  console.log('Creating 50 posts...');
  await Post.bulkCreate(
    Array.from({ length: 50 }, () => ({
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(3),
      authorId: faker.helpers.arrayElement(authorIds),
    })),
  );

  console.log('Seeding completed!');
  await app.close();
}

seed().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
