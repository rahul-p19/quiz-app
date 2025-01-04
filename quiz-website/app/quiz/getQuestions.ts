'use server'
import { db as prisma } from "@/prisma/client";
import { QuestionType } from "@/schemas";

const getAllQuestions = async () => {
  const questions: QuestionType[] = await prisma.question.findMany();
  return questions;
}

export default getAllQuestions;
