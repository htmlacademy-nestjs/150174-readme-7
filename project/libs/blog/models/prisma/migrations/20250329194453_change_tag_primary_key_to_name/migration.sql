/*
  Warnings:

  - The primary key for the `_PostToTag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `tags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `tags` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PostToTag" DROP CONSTRAINT "_PostToTag_B_fkey";

-- AlterTable
ALTER TABLE "_PostToTag" DROP CONSTRAINT "_PostToTag_AB_pkey",
ALTER COLUMN "B" SET DATA TYPE VARCHAR(255),
ADD CONSTRAINT "_PostToTag_AB_pkey" PRIMARY KEY ("A", "B");

-- AlterTable
ALTER TABLE "tags" DROP CONSTRAINT "tags_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "tags_pkey" PRIMARY KEY ("name");

-- AddForeignKey
ALTER TABLE "_PostToTag" ADD CONSTRAINT "_PostToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("name") ON DELETE CASCADE ON UPDATE CASCADE;
