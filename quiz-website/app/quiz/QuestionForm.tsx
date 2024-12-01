import React, { useContext, useEffect, useState } from "react";
import { QuestionType } from "@/schemas";
import { QuizContext } from "./QuizContext";

export default function QuestionForm({ question }: { question: QuestionType }) {
  const context = useContext(QuizContext);
  if (!context) return;
  const answers = context.answers;
  const setAnswers = context.setAnswers;

  const [backgrounds, setBackgrounds] = useState<{ a: string, b: string, c: string, d: string }>({
    a: 'bg-white',
    b: 'bg-white',
    c: 'bg-white',
    d: 'bg-white'
  });

  useEffect(() => {
    switch (answers[question.questionId - 1]) {
      case "a":
        setBackgrounds({
          a: 'bg-blue-400',
          b: 'bg-white',
          c: 'bg-white',
          d: 'bg-white'
        })
        break;
      case "b":
        setBackgrounds({
          a: 'bg-white',
          b: 'bg-blue-400',
          c: 'bg-white',
          d: 'bg-white'
        })
        break;
      case "c":
        setBackgrounds({
          a: 'bg-white',
          b: 'bg-white',
          c: 'bg-blue-400',
          d: 'bg-white'
        })
        break;
      case "d":
        setBackgrounds({
          a: 'bg-white',
          b: 'bg-white',
          c: 'bg-white',
          d: 'bg-blue-400'
        })
        break;
      default:
        setBackgrounds({
          a: 'bg-white',
          b: 'bg-white',
          c: 'bg-white',
          d: 'bg-white'
        })
        break;
    }
  }, [question]);

  return (
    <div>

      <h1>{question.statement}</h1>

      <form className="flex flex-col items-center gap-y-2">
        <button
          onClick={(e) => {
            e.preventDefault();
            setAnswers(() => {
              const temp = answers;
              temp[question.questionId - 1] = 'a';
              return temp;
            });
            setBackgrounds({
              a: 'bg-blue-400',
              b: 'bg-white',
              c: 'bg-white',
              d: 'bg-white'
            });
            localStorage.setItem("answers", JSON.stringify(answers));
            console.log(answers);
          }}
          className={`text-black px-2 py-1 rounded-sm ${backgrounds.a}`}
        >
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
              a: 'bg-white',
              b: 'bg-blue-400',
              c: 'bg-white',
              d: 'bg-white'
            });
            ;
            localStorage.setItem("answers", JSON.stringify(answers));
            console.log(answers);
          }}
          className={`text-black px-2 py-1 rounded-sm ${backgrounds.b}`}
        >
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
              a: 'bg-white',
              b: 'bg-white',
              c: 'bg-blue-400',
              d: 'bg-white'
            });

            localStorage.setItem("answers", JSON.stringify(answers));
            console.log(answers);
          }}
          className={`text-black px-2 py-1 rounded-sm ${backgrounds.c}`}
        >
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
              a: 'bg-white',
              b: 'bg-white',
              c: 'bg-white',
              d: 'bg-blue-400'
            });
            localStorage.setItem("answers", JSON.stringify(answers));
            console.log(answers);
          }}
          className={`text-black px-2 py-1 rounded-sm ${backgrounds.d}`}
        >
          {question.optiond}
        </button>

      </form>
    </div >
  )
}

