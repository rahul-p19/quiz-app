"use server"
import { db } from "@/prisma/client";
import { QuestionType } from "@/schemas";

interface validAnswerType {
  userId: string,
  selectedOption: string,
  questionId: number
}

export default async function submitQuiz(answers: string[], userId: string, allQuestions: QuestionType[] | undefined) {
  if (!allQuestions) return { ok: false, msg: "Error in submission" };
  try {
    const userData = await db.user.findFirst({
      where: {
        id: userId
      },
      select: {
        quizSubmitted: true
      }
    });

    if (!userData || userData.quizSubmitted) return { ok: false, msg: "User has already submitted" }

    let validAnswers: validAnswerType[] = [];

    answers.forEach((ans: string, ind: number) => {
      if (ans === "a" || ans === "b" || ans === "c" || ans === "d") {
        const validAns: validAnswerType = {
          userId: userId,
          selectedOption: ans,
          questionId: ind + 1
        };
        validAnswers.push(validAns);
        return validAns;
      }
    });

    await db.answer.createMany({
      data: validAnswers
    });

    let points = 0;

    validAnswers.forEach((ans: validAnswerType) => {
      if (ans.selectedOption === allQuestions[ans.questionId - 1].correctOption) {
        console.log("Correct answer!");
        points += allQuestions[ans.questionId - 1].marks;
      }
    })

    await db.user.update({
      where: {
        id: userId
      },
      data: {
        quizSubmitted: true,
        score: points
      }
    })

    return { ok: true, msg: "Quiz submitted successfully" };
  } catch (err) {
    return { ok: false, msg: "Error in submitting quiz" };
  }
}
