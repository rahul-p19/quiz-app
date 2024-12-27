/*
  Warnings:

  - The `correctOption` column on the `Question` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `selectedOption` on the `Answer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Answer" DROP COLUMN "selectedOption",
ADD COLUMN     "selectedOption" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "correctOption",
ADD COLUMN     "correctOption" TEXT NOT NULL DEFAULT 'a';

-- DropEnum
DROP TYPE "AnswerType";
