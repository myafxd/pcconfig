-- CreateTable
CREATE TABLE "Component" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "externalId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "image" TEXT NOT NULL,
    "type" TEXT,
    "componentType" TEXT NOT NULL,
    "power" INTEGER,
    "wattage" INTEGER,
    "socket" TEXT,
    "ramType" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Component_externalId_key" ON "Component"("externalId");

-- CreateIndex
CREATE INDEX "Component_componentType_idx" ON "Component"("componentType");
