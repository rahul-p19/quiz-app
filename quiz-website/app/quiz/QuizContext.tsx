import { createContext } from "react";
import { QuestionType } from "@/schemas";

interface QuizContextType {
  answers: string[];
  setAnswers: React.Dispatch<React.SetStateAction<string[]>>;
  question: QuestionType;
  setQuestion: React.Dispatch<React.SetStateAction<QuestionType>>;
}

export const QuizContext = createContext<QuizContextType | undefined>(undefined);
