-- AlterTable
ALTER TABLE "comments" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "favorites" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
