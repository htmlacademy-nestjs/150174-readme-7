/*
  Warnings:

  - You are about to drop the column `quote_author_id` on the `quote_posts` table. All the data in the column will be lost.
  - Added the required column `autor_name` to the `quote_posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "link_posts" ALTER COLUMN "description" SET DATA TYPE VARCHAR(300);

-- AlterTable
ALTER TABLE "quote_posts" DROP COLUMN "quote_author_id",
ADD COLUMN     "autor_name" VARCHAR(50) NOT NULL;
