/*
  Warnings:

  - Added the required column `externalId` to the `BringList` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BringList" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "externalId" TEXT NOT NULL
);
INSERT INTO "new_BringList" ("createdAt", "description", "id", "name", "updatedAt") SELECT "createdAt", "description", "id", "name", "updatedAt" FROM "BringList";
DROP TABLE "BringList";
ALTER TABLE "new_BringList" RENAME TO "BringList";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
