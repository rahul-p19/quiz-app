import React, { useContext, useEffect, useState } from "react";
import { QuestionType } from "@/schemas";
import { QuizContext } from "./QuizContext";

interface BackgroundsType {
  a: string;
  b: string;
  c: string;
  d: string;
}

const UNSELECTED = "bg-blue-200";
const SELECTED = "bg-blue-400 border border-blue-700";

// function that gets the utility classes for the backgrounds of the 4 buttons, depending on the option passed
const getFormButtons = (option: string = "none") => {
  const defaultButtons: BackgroundsType = {
    a: UNSELECTED,
    b: UNSELECTED,
    c: UNSELECTED,
    d: UNSELECTED,
  };

  if (["a", "b", "c", "d"].includes(option))
    return { ...defaultButtons, [option]: SELECTED }; // if valid option is passed, select it
  else return defaultButtons; // otherwise no selections
};

export default function QuestionForm({ question }: { question: QuestionType }) {
  const context = useContext(QuizContext);

  const { answers, setAnswers } = context!;

  const [backgrounds, setBackgrounds] = useState<BackgroundsType>(
    getFormButtons()
  );

  useEffect(() => {
    setBackgrounds(getFormButtons(answers[question.questionId - 1]));
  }, [question, answers]);

  const handleOptionClick = (option: string, e: React.FormEvent) => {
    e.preventDefault();
    const unselecting = answers[question.questionId - 1] === option; // if clicking an already selected button, unselect the button
    setAnswers((prev) => {
      const temp = [...prev];
      temp[question.questionId - 1] = unselecting ? "" : option;
      return temp;
    });
    setBackgrounds(getFormButtons(unselecting ? option : ""));
    localStorage.setItem("answers", JSON.stringify(answers));
  };

  return (
    <div className="flex p-6 sm:my-6 flex-col w-full items-center">
      <h1
        className={`mb-8 text-2xl font-semibold ${
          question.marks === 20 ? "text-[#FFD700]" : "text-white"
        }`}
      >
        {question.questionId}. {question.statement}
      </h1>

      <form className="flex flex-col items-center gap-y-4">
        {(["a", "b", "c", "d"] as Array<keyof BackgroundsType>).map(
          (option) => (
            <button
              key={option}
              onClick={(e) => handleOptionClick(option, e)}
              className={`text-black flex items-center gap-2 px-3 py-2 rounded-sm ${backgrounds[option]}`}
            >
              <span className="border-2 border-black h-fit rounded-sm px-1 text-sm">
                {option.toUpperCase()}
              </span>
              {question[`option${option}` as keyof QuestionType]}
            </button>
          )
        )}
      </form>
    </div>
  );
}
