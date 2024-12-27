'use server'
import { db as prisma } from "@/prisma/client";
import { QuestionType } from "@/schemas";
import { unstable_cache } from "next/cache";

const getQuestions = async () => {
  const questions: QuestionType[] = await prisma.question.findMany();
  return questions;
}

export async function getAllQuestions() {
  const data = unstable_cache(getQuestions);
  return data;
}
