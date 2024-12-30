/*
  Warnings:

  - Made the column `department` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `year` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "department" SET NOT NULL,
ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "year" SET NOT NULL;
