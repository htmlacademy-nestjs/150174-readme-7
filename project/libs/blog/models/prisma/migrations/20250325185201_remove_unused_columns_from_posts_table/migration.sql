/*
  Warnings:

  - You are about to drop the column `description` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `image_src` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `link` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `quote` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `quote_author_id` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `video_src` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "description",
DROP COLUMN "image_src",
DROP COLUMN "link",
DROP COLUMN "quote",
DROP COLUMN "quote_author_id",
DROP COLUMN "video_src";

-- CreateIndex
CREATE INDEX "image_posts_post_id_idx" ON "image_posts"("post_id");

-- CreateIndex
CREATE INDEX "link_posts_post_id_idx" ON "link_posts"("post_id");

-- CreateIndex
CREATE INDEX "quote_posts_post_id_idx" ON "quote_posts"("post_id");

-- CreateIndex
CREATE INDEX "text_posts_post_id_idx" ON "text_posts"("post_id");

-- CreateIndex
CREATE INDEX "video_posts_post_id_idx" ON "video_posts"("post_id");
