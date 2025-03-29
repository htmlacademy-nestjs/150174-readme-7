/*
  Warnings:

  - The primary key for the `image_posts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `post_id` on the `image_posts` table. All the data in the column will be lost.
  - The primary key for the `link_posts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `post_id` on the `link_posts` table. All the data in the column will be lost.
  - The primary key for the `quote_posts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `post_id` on the `quote_posts` table. All the data in the column will be lost.
  - The primary key for the `text_posts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `post_id` on the `text_posts` table. All the data in the column will be lost.
  - The primary key for the `video_posts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `post_id` on the `video_posts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `posts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[data_relation_id]` on the table `posts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `data_relation_id` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "image_posts" DROP CONSTRAINT "image_posts_post_id_fkey";

-- DropForeignKey
ALTER TABLE "link_posts" DROP CONSTRAINT "link_posts_post_id_fkey";

-- DropForeignKey
ALTER TABLE "quote_posts" DROP CONSTRAINT "quote_posts_post_id_fkey";

-- DropForeignKey
ALTER TABLE "text_posts" DROP CONSTRAINT "text_posts_post_id_fkey";

-- DropForeignKey
ALTER TABLE "video_posts" DROP CONSTRAINT "video_posts_post_id_fkey";

-- DropIndex
DROP INDEX "image_posts_post_id_idx";

-- DropIndex
DROP INDEX "link_posts_post_id_idx";

-- DropIndex
DROP INDEX "quote_posts_post_id_idx";

-- DropIndex
DROP INDEX "text_posts_post_id_idx";

-- DropIndex
DROP INDEX "video_posts_post_id_idx";

-- AlterTable
ALTER TABLE "image_posts" DROP CONSTRAINT "image_posts_pkey",
DROP COLUMN "post_id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "image_posts_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "link_posts" DROP CONSTRAINT "link_posts_pkey",
DROP COLUMN "post_id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "link_posts_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "data_relation_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "quote_posts" DROP CONSTRAINT "quote_posts_pkey",
DROP COLUMN "post_id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "quote_posts_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "text_posts" DROP CONSTRAINT "text_posts_pkey",
DROP COLUMN "post_id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "text_posts_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "video_posts" DROP CONSTRAINT "video_posts_pkey",
DROP COLUMN "post_id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "video_posts_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "posts_to_kinds" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "post_id" UUID,
    "text_data_id" UUID,
    "video_data_id" UUID,
    "image_data_id" UUID,
    "quote_data_id" UUID,
    "link_data_id" UUID,

    CONSTRAINT "posts_to_kinds_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "posts_to_kinds_id_key" ON "posts_to_kinds"("id");

-- CreateIndex
CREATE UNIQUE INDEX "posts_to_kinds_post_id_key" ON "posts_to_kinds"("post_id");

-- CreateIndex
CREATE UNIQUE INDEX "posts_id_key" ON "posts"("id");

-- CreateIndex
CREATE UNIQUE INDEX "posts_data_relation_id_key" ON "posts"("data_relation_id");

-- AddForeignKey
ALTER TABLE "posts_to_kinds" ADD CONSTRAINT "posts_to_kinds_text_data_id_fkey" FOREIGN KEY ("text_data_id") REFERENCES "text_posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts_to_kinds" ADD CONSTRAINT "posts_to_kinds_video_data_id_fkey" FOREIGN KEY ("video_data_id") REFERENCES "video_posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts_to_kinds" ADD CONSTRAINT "posts_to_kinds_image_data_id_fkey" FOREIGN KEY ("image_data_id") REFERENCES "image_posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts_to_kinds" ADD CONSTRAINT "posts_to_kinds_quote_data_id_fkey" FOREIGN KEY ("quote_data_id") REFERENCES "quote_posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts_to_kinds" ADD CONSTRAINT "posts_to_kinds_link_data_id_fkey" FOREIGN KEY ("link_data_id") REFERENCES "link_posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_data_relation_id_fkey" FOREIGN KEY ("data_relation_id") REFERENCES "posts_to_kinds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
