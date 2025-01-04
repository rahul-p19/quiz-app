import React, { useContext, useEffect, useState } from "react";
import { QuestionType } from "@/schemas";
import { QuizContext } from "./QuizContext";

export default function QuestionForm({ question }: { question: QuestionType }) {
  const context = useContext(QuizContext);
  //if (!context) return;
  const answers = context!.answers;
  const setAnswers = context!.setAnswers;

  const [backgrounds, setBackgrounds] = useState<{ a: string, b: string, c: string, d: string }>({
    a: 'bg-blue-200',
    b: 'bg-blue-200',
    c: 'bg-blue-200',
    d: 'bg-blue-200'
  });

  useEffect(() => {
    switch (answers[question.questionId - 1]) {
      case "a":
        setBackgrounds({
          a: 'bg-blue-400 border border-blue-700',
          b: 'bg-blue-200',
          c: 'bg-blue-200',
          d: 'bg-blue-200'
        })
        break;
      case "b":
        setBackgrounds({
          a: 'bg-blue-200',
          b: 'bg-blue-400 border border-blue-700',
          c: 'bg-blue-200',
          d: 'bg-blue-200'
        })
        break;
      case "c":
        setBackgrounds({
          a: 'bg-blue-200',
          b: 'bg-blue-200',
          c: 'bg-blue-400 border border-blue-700',
          d: 'bg-blue-200'
        })
        break;
      case "d":
        setBackgrounds({
          a: 'bg-blue-200',
          b: 'bg-blue-200',
          c: 'bg-blue-200',
          d: 'bg-blue-400 border border-blue-700'
        })
        break;
      default:
        setBackgrounds({
          a: 'bg-blue-200',
          b: 'bg-blue-200',
          c: 'bg-blue-200',
          d: 'bg-blue-200'
        })
        break;
    }
  }, [question, answers]);

  return (
    <div className="flex p-6 sm:my-8 flex-col w-full items-center">

      <h1 className="mb-8 text-2xl font-semibold">{question.questionId}. {question.statement}</h1>

      <form className="flex flex-col items-center gap-y-4">
        <button
          onClick={(e) => {
            e.preventDefault();
            setAnswers(() => {
              const temp = answers;
              temp[question.questionId - 1] = 'a';
              return temp;
            });
            setBackgrounds({
              a: 'bg-blue-400 border-2 border-blue-700',
              b: 'bg-blue-200',
              c: 'bg-blue-200',
              d: 'bg-blue-200'
            });
            localStorage.setItem("answers", JSON.stringify(answers));
          }}
          className={`text-black flex items-center gap-2 px-3 py-2 rounded-sm ${backgrounds.a}`}
        >
          <span className="border-2 border-black h-fit rounded-sm px-1 text-sm">A</span>
          {question.optiona}
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setAnswers(() => {
              const temp = answers;
              temp[question.questionId - 1] = 'b';
              return temp;
            });
            setBackgrounds({
              a: 'bg-blue-200',
              b: 'bg-blue-400 border-2 border-blue-700',
              c: 'bg-blue-200',
              d: 'bg-blue-200'
            });
            ;
            localStorage.setItem("answers", JSON.stringify(answers));
          }}
          className={`text-black flex items-center gap-2 px-3 py-2 rounded-sm ${backgrounds.b}`}
        >
          <span className="border-2 border-black h-fit rounded-sm px-1 text-sm">B</span>
          {question.optionb}
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setAnswers(() => {
              const temp = answers;
              temp[question.questionId - 1] = 'c';
              return temp;
            });
            setBackgrounds({
              a: 'bg-blue-200',
              b: 'bg-blue-200',
              c: 'bg-blue-400 border-2 border-blue-700',
              d: 'bg-blue-200'
            });

            localStorage.setItem("answers", JSON.stringify(answers));
          }}
          className={`text-black flex items-center gap-2 px-3 py-2 rounded-sm ${backgrounds.c}`}
        >
          <span className="border-2 border-black h-fit rounded-sm px-1 text-sm">C</span>
          {question.optionc}
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            setAnswers(() => {
              const temp = answers;
              temp[question.questionId - 1] = 'd';
              return temp;
            });
            //setAnswers((prev) => ([...prev, answers[question.questionId - 1] = 'c']));
            setBackgrounds({
              a: 'bg-blue-200',
              b: 'bg-blue-200',
              c: 'bg-blue-200',
              d: 'bg-blue-400 border-2 border-blue-700'
            });
            localStorage.setItem("answers", JSON.stringify(answers));
          }}
          className={`text-black flex items-center gap-2 px-3 py-2 rounded-sm ${backgrounds.d}`}
        >
          <span className="border-2 border-black rounded-sm px-1 text-sm">D</span>
          {question.optiond}
        </button>

      </form>
    </div >
  )
}

