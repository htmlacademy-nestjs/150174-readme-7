/*
  Warnings:

  - You are about to drop the column `content` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `preview` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "content",
DROP COLUMN "name",
DROP COLUMN "preview";

-- CreateTable
CREATE TABLE "text_posts" (
    "post_id" UUID NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "preview" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "text_posts_pkey" PRIMARY KEY ("post_id")
);

-- CreateTable
CREATE TABLE "image_posts" (
    "post_id" UUID NOT NULL,
    "image_src" VARCHAR(255) NOT NULL,

    CONSTRAINT "image_posts_pkey" PRIMARY KEY ("post_id")
);

-- CreateTable
CREATE TABLE "video_posts" (
    "post_id" UUID NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "video_src" VARCHAR(255) NOT NULL,

    CONSTRAINT "video_posts_pkey" PRIMARY KEY ("post_id")
);

-- CreateTable
CREATE TABLE "quote_posts" (
    "post_id" UUID NOT NULL,
    "quote" TEXT NOT NULL,
    "quote_author_id" VARCHAR(30) NOT NULL,

    CONSTRAINT "quote_posts_pkey" PRIMARY KEY ("post_id")
);

-- CreateTable
CREATE TABLE "link_posts" (
    "post_id" UUID NOT NULL,
    "link" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,

    CONSTRAINT "link_posts_pkey" PRIMARY KEY ("post_id")
);

-- AddForeignKey
ALTER TABLE "text_posts" ADD CONSTRAINT "text_posts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image_posts" ADD CONSTRAINT "image_posts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "video_posts" ADD CONSTRAINT "video_posts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quote_posts" ADD CONSTRAINT "quote_posts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "link_posts" ADD CONSTRAINT "link_posts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
