-- CreateTable
CREATE TABLE "Tile" (
    "id" SERIAL NOT NULL,
    "geom" TEXT NOT NULL,
    "metadata" JSONB NOT NULL,

    CONSTRAINT "Tile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AOI" (
    "id" INTEGER NOT NULL,
    "geom" TEXT NOT NULL,

    CONSTRAINT "AOI_pkey" PRIMARY KEY ("id")
);
