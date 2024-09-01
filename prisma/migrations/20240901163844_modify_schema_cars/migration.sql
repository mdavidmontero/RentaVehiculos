/*
  Warnings:

  - You are about to drop the column `transmision` on the `Car` table. All the data in the column will be lost.
  - Added the required column `transmission` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Car" DROP COLUMN "transmision",
ADD COLUMN     "transmission" TEXT NOT NULL;
