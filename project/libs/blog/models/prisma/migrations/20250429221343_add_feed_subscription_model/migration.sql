-- CreateTable
CREATE TABLE "feed_subscriptions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "subscriber_id" VARCHAR(30) NOT NULL,
    "subscription_id" VARCHAR(30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "feed_subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "feed_subscriptions_id_key" ON "feed_subscriptions"("id");

-- CreateIndex
CREATE INDEX "feed_subscriptions_subscriber_id_idx" ON "feed_subscriptions"("subscriber_id");
