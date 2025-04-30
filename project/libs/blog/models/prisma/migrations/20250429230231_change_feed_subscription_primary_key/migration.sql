/*
  Warnings:

  - The primary key for the `feed_subscriptions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `feed_subscriptions` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "feed_subscriptions_id_key";

-- DropIndex
DROP INDEX "feed_subscriptions_subscriber_id_idx";

-- AlterTable
ALTER TABLE "feed_subscriptions" DROP CONSTRAINT "feed_subscriptions_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "feed_subscriptions_pkey" PRIMARY KEY ("subscriber_id", "subscription_id");
