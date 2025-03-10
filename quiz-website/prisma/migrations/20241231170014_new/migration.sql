-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL DEFAULT '0000000000',
    "department" TEXT NOT NULL DEFAULT '',
    "year" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "score" INTEGER NOT NULL DEFAULT 0,
    "quizSubmitted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Answer" (
    "answerId" TEXT NOT NULL,
    "selectedOption" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "questionId" INTEGER NOT NULL,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("answerId")
);

-- CreateTable
CREATE TABLE "Question" (
    "questionId" SERIAL NOT NULL,
    "statement" TEXT NOT NULL,
    "optiona" TEXT NOT NULL,
    "optionb" TEXT NOT NULL,
    "optionc" TEXT NOT NULL,
    "optiond" TEXT NOT NULL,
    "correctOption" TEXT NOT NULL DEFAULT 'a',
    "marks" INTEGER NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("questionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("questionId") ON DELETE RESTRICT ON UPDATE CASCADE;
