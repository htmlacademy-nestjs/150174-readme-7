import { Comment, Post } from '@avylando-readme/core';
import { PrismaClient } from '@prisma/client';

const FIRST_COMMENT_UUID = '39614113-7ad5-45b6-8093-06455437e1e2';
const SECOND_COMMENT_UUID = 'efd775e2-df55-4e0e-a308-58249f5ea202';

const FIRST_POST_UUID = '6d308040-96a2-4162-bea6-2338e9976540';
const SECOND_POST_UUID = 'ab04593b-da99-4fe3-8b4b-e06d82e2efdd';

const FIRST_USER_ID = '658170cbb954e9f5b905ccf4';
const SECOND_USER_ID = '6581762309c030b503e30512';

function getComments(): Comment[] {
  return [
    {
      id: FIRST_COMMENT_UUID,
      authorId: FIRST_USER_ID,
      postId: FIRST_POST_UUID,
      content: 'Комментарий к первому посту',
    },
    {
      id: SECOND_COMMENT_UUID,
      authorId: SECOND_USER_ID,
      postId: SECOND_POST_UUID,
      content: 'Комментарий ко второму посту',
    },
  ];
}

function getPosts(): Post[] {
  return [
    {
      id: FIRST_POST_UUID,
      name: 'Худеющий',
      authorId: FIRST_USER_ID,
      kind: 'text',
      status: 'published',
      content: 'Недавно прочитал страшный роман «Худеющий».',
      preview:
        'На мой взгляд, это один из самых страшных романов Стивена Кинга.',
    },
    {
      id: SECOND_POST_UUID,
      kind: 'text',
      status: 'draft',
      name: 'Вы не знаете JavaScript',
      authorId: FIRST_USER_ID,
      content: 'Полезная книга по JavaScript',
      preview: 'Секреты и тайные знания по JavaScript.',
    },
  ];
}

async function seedDb(prismaClient: PrismaClient) {
  const mockPosts = getPosts();
  for (const post of mockPosts) {
    await prismaClient.post.upsert({
      where: { id: post.id },
      update: {},
      create: post,
    });
  }

  const mockComments = getComments();
  for (const comment of mockComments) {
    await prismaClient.comment.upsert({
      where: { id: comment.id },
      update: {},
      create: {
        id: comment.id,
        content: comment.content,
        authorId: comment.authorId,
        postId: comment.postId,
      },
    });
  }

  console.info('🤘️ Database was filled');
}

async function bootstrap() {
  const prismaClient = new PrismaClient();

  try {
    await seedDb(prismaClient);
    globalThis.process.exit(0);
  } catch (error: unknown) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}

bootstrap();
