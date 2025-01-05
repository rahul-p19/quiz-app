'use server'
import { db as prisma } from "@/prisma/client"

export const addQuestion = async ({ statement, optionA, optionB, optionC, optionD, correctAnswer, marks }: {
  statement: string,
  optionA: string,
  optionB: string,
  optionC: string,
  optionD: string,
  correctAnswer: string,
  marks: string,
}) => {
  try {
    await prisma.question.create({
      data: {
        statement,
        optiona: optionA,
        optionb: optionB,
        optionc: optionC,
        optiond: optionD,
        correctOption: correctAnswer,
        marks: parseInt(marks),
      },
    });
    return { ok: true }
  }
  catch (err) {
    console.error(err);
    return { ok: false };
  }
}

export const deleteQuestion = async (questionId: number) => {
  try {
    await prisma.question.delete({
      where: {
        questionId
      }
    })
    return { ok: true };
  } catch (err) {
    return { ok: false }
  }
}
