-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('published', 'draft');

-- CreateEnum
CREATE TYPE "PostKind" AS ENUM ('text', 'image', 'video', 'link', 'quote');

-- CreateTable
CREATE TABLE "posts" (
    "id" UUID NOT NULL,
    "author_id" VARCHAR(30) NOT NULL,
    "status" "PostStatus" NOT NULL,
    "tags" VARCHAR(255)[],
    "kind" "PostKind" NOT NULL,
    "content" TEXT,
    "name" VARCHAR(255),
    "preview" VARCHAR(255),
    "link" VARCHAR(255),
    "description" VARCHAR(255),
    "image_src" TEXT,
    "quote" TEXT,
    "quote_author_id" VARCHAR(30),
    "video_src" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" UUID NOT NULL,
    "post_id" UUID NOT NULL,
    "author_id" VARCHAR(30) NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorites" (
    "id" UUID NOT NULL,
    "post_id" UUID NOT NULL,
    "user_id" VARCHAR(30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "favorites_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "comments_post_id_idx" ON "comments"("post_id");

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
