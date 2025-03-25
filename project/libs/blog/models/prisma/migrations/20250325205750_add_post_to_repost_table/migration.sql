-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "repost" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "posts_to_reposts" (
    "post_id" UUID NOT NULL,
    "original_post_id" UUID NOT NULL,

    CONSTRAINT "posts_to_reposts_pkey" PRIMARY KEY ("post_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "posts_to_reposts_post_id_key" ON "posts_to_reposts"("post_id");

-- CreateIndex
CREATE UNIQUE INDEX "posts_to_reposts_original_post_id_key" ON "posts_to_reposts"("original_post_id");

-- AddForeignKey
ALTER TABLE "posts_to_reposts" ADD CONSTRAINT "posts_to_reposts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts_to_reposts" ADD CONSTRAINT "posts_to_reposts_original_post_id_fkey" FOREIGN KEY ("original_post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
