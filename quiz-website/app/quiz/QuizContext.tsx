import { createContext } from "react";

interface QuizContextType {
  answers: string[];
  setAnswers: React.Dispatch<React.SetStateAction<string[]>>;
}

export const QuizContext = createContext<QuizContextType | undefined>(undefined);
