-- CreateTable
CREATE TABLE "Reservas" (
    "id" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "at" TEXT NOT NULL,
    "mes" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);
