-- CreateTable
CREATE TABLE "Esp" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Esp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Files" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "espId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Files_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Esp_name_key" ON "Esp"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Files_name_key" ON "Files"("name");

-- AddForeignKey
ALTER TABLE "Files" ADD CONSTRAINT "Files_espId_fkey" FOREIGN KEY ("espId") REFERENCES "Esp"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
