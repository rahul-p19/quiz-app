'use client'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { QuizContext } from "./QuizContext";
import getAllQuestions from "./getQuestions";
import { QuestionType } from '@/schemas';
import submitQuiz from './submitQuiz';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

const getPaginationRange = (allQuestions: QuestionType[], question: QuestionType) => {
  let dot = false;
  allQuestions.sort((a, b) => {
    return a.questionId - b.questionId;
  })
  const range = allQuestions.map((ques) => {
    if (ques.questionId === question.questionId) {
      dot = false;
      return 0;
    }
    if (ques.questionId === 1 || ques.questionId === allQuestions.length || Math.abs(ques.questionId - question.questionId) === 1 || ques.questionId - question.questionId === 2) {
      dot = false;
      return 1;
    }
    if (!dot) {
      dot = true;
      return -1;
    }
    dot = true;
    return -2;
  });
  return range;
}

function Navbar({ answers, userId }: { answers: string[], userId: string }) {
  const [allQuestions, setAllQuestions] = useState<QuestionType[]>();
  const [submissionStatus, setSubmissionStatus] = useState<string>("Submit");
  const [submissionMessage, setSubmissionMessage] = useState<string>("");
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const myContext = useContext(QuizContext);

  const setQuestion = myContext!.setQuestion;
  const question = myContext!.question;

  useEffect(() => {
    getAllQuestions()
      .then(res => {
        setAllQuestions(res);
      });
  }, [])

  const questionCount = allQuestions?.length ?? 20;

  const handleSubmit = (answers: string[], userId: string) => {
    setSubmissionStatus("Submitting");
    submitQuiz(answers, userId, allQuestions)
      .then((res: { ok: boolean, msg: string } | undefined) => {
        if (res)
          setSubmissionMessage(res.msg);
        if (res && res.ok === true) {
          setSubmissionStatus("Submitted");
        } else {
          setSubmissionStatus("Submit");
        }
      })
      .catch((_err: any) => {
        setSubmissionMessage("Error occurred.");
        setSubmissionStatus("Submit");
      }
      )
  }

  if (!allQuestions) return;
  const paginationRange = getPaginationRange(allQuestions!, question);

  return (
    <div className="w-full px-6 flex flex-col items-center gap-y-4">
      <div className='bg-sky-300/50 px-2 sm:px-4 py-2 rounded-sm flex gap-x-1.5 sm:gap-x-3'>

        <button className='text-black sm:p-1 rounded-sm hover:bg-sky-500/70'
          onClick={() => {
            if (allQuestions)
              setQuestion((prev) => {
                if (prev.questionId === 1) return allQuestions.find(question => question.questionId === questionCount)!;
                return allQuestions.find(question => question.questionId === prev.questionId - 1)!;
              });
          }}>
          <IconChevronLeft />
        </button>

        {allQuestions && paginationRange.map((val: number, ind: number) => {
          if (val === 0 || val === 1) {
            return (
              <button key={ind}
                onClick={() => {
                  setQuestion(() => allQuestions[ind]);
                }}
                className={`text-black border px-1 sm:px-2 py-1 transition-all duration-150 rounded-sm hover:bg-sky-500/70 border-transparent ${(ind + 1) === question.questionId ? "bg-blue-700/50 border-blue-700" : ""}`}>
                {ind + 1}
              </button>)
          }
          else if (val === -1)
            return (
              <p key={ind}
                className={`text-black py-1 transition-all duration-150 rounded-sm}`}>
                ...
              </p>)
        }
        )}

        <button className='text-black sm:p-1 rounded-sm hover:bg-sky-500/70'
          onClick={() => {
            if (allQuestions)
              setQuestion((prev) => {
                if (prev.questionId === questionCount) return allQuestions.find(ques => ques.questionId === 1)!;
                return allQuestions.find(ques => ques.questionId === prev.questionId + 1)!;
              });
          }}>
          <IconChevronRight />
        </button>
      </div>
      <button disabled={submissionStatus === "Submitted" || submissionStatus === "Submitting"}
        onClick={() => dialogRef.current?.showModal()}
        className='bg-white rounded-sm text-black font-medium px-4 py-1'>
        {submissionStatus}
      </button>
      <p className='text-white font-medium pb-2'>{submissionMessage}</p>

      <dialog ref={dialogRef} className='backdrop:bg-gray-400/5 backdrop:backdrop-blur-sm bg-blue-950 text-black p-8 rounded-md'>
        <div className='flex flex-col gap-y-8 text-white'>
          <h3 className='w-full text-center font-semibold text-2xl'>Confirmation</h3>
          <p className='text-center'>
            Are you sure you want to submit? <br /> You are submitting the <span className='font-medium text-blue-200'>entire</span> quiz, and won't be able to change your answers later.
          </p>
          <div className='flex text-black w-full justify-around'>

            <button onClick={() => {
              handleSubmit(answers, userId);
              dialogRef.current?.close();
            }} disabled={submissionStatus === "Submitted" || submissionStatus === "Submitting"} className='bg-green-600 px-2 py-1 rounded-sm'>
              {submissionStatus}
            </button>

            <button className='bg-gray-400 px-2 py-1 rounded-sm' onClick={() => dialogRef.current?.close()}>Cancel</button>
          </div>
        </div>
      </dialog>
    </div >
  )
}
export default Navbar
