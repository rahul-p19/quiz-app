import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "POST") {
      const {
        statement,
        optionA,
        optionB,
        optionC,
        optionD,
        correctAnswer,
        marks,
      } = req.body;

      if (
        !statement ||
        !optionA ||
        !optionB ||
        !optionC ||
        !optionD ||
        !correctAnswer ||
        marks === undefined
      ) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const newQuestion = await prisma.question.create({
        data: {
          statement,
          optiona: optionA,
          optionb: optionB,
          optionc: optionC,
          optiond: optionD,
          correctOption: correctAnswer,
          marks: parseInt(marks, 10),
        },
      });

      return res.status(201).json({ message: "Question added successfully", question: newQuestion });
    } else if (req.method === "DELETE") {

      const { questionId } = req.body;

      if (!questionId) {
        return res.status(400).json({ error: "Question ID is required" });
      }

      const deletedQuestion = await prisma.question.delete({
        where: {
          questionId: parseInt(questionId, 10),
        },
      });

      return res.status(200).json({ message: "Question deleted successfully", question: deletedQuestion });
    } else if (req.method === "GET") {
      const leaderboard = await prisma.user.findMany({
        select: {
          name: true,
          email: true,
          score: true,
        },
        orderBy: {
          score: "desc", 
        },
      });

      return res.status(200).json({ leaderboard });
    } else {

      res.setHeader("Allow", ["POST", "DELETE", "GET"]);
      return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
  } catch (error) {
    console.error("Error in questions handler:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
