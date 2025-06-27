"use server"
import { producer } from "@/lib/kafka";
//import { db } from "@/prisma/client";
import { QuestionType } from "@/schemas";

interface validAnswerType {
  userId: string,
  selectedOption: string,
  questionId: number

}

export default async function submitQuiz(answers: string[], userId: string, allQuestions: QuestionType[] | undefined) {
  if (!allQuestions) return { ok: false, msg: "Error in submission" };
  try {
    // const userData = await db.user.findFirst({
    //   where: {
    //     id: userId
    //   },
    //   select: {
    //     quizSubmitted: true
    //   }
    // });

    // if (!userData || userData.quizSubmitted) return { ok: false, msg: "User has already submitted" }

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

    // await db.answer.createMany({
    //   data: validAnswers
    // });

    let points = 0;

    validAnswers.forEach((ans: validAnswerType) => {
      if (ans.selectedOption === allQuestions[ans.questionId - 1].correctOption) {
        points += allQuestions[ans.questionId - 1].marks;
      } else {
        if (ans.selectedOption !== "" && allQuestions[ans.questionId - 1].marks === 20)
          points -= 20;
      }
    })

    // Instead of directly updating DB, using Kafka to make the system scalable.
    // await db.user.update({
    //   where: {
    //     id: userId
    //   },
    //   data: {
    //     quizSubmitted: true,
    //     score: points
    //   }
    // })

    await producer.connect();

    await producer.send({
      topic: "quiz-submissions",
      messages: [
        {
          key: userId,
          value: JSON.stringify({
            userId,
            answers: validAnswers,
            points,
            submittedAt: new Date().toISOString()
          })
        }
      ]
    })

    return { ok: true, msg: "Quiz submitted successfully (queued for processing)" };
  } catch (err) {
    return { ok: false, msg: "Error in submitting quiz" };
  }
}
