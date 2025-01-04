import React, { useContext, useEffect, useState } from 'react'
import { QuizContext } from "./QuizContext";
import getAllQuestions from "./getQuestions";
import { QuestionType } from '@/schemas';
import submitQuiz from './submitQuiz';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';


function Navbar({ answers, userId, currentQuestion }: { answers: string[], userId: string, currentQuestion: number }) {
  const [allQuestions, setAllQuestions] = useState<QuestionType[]>();
  const [submissionStatus, setSubmissionStatus] = useState<string>("Submit");
  const myContext = useContext(QuizContext);

  const setQuestion = myContext!.setQuestion;

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
      .then((res: { ok: boolean } | undefined) => {
        if (res && res.ok === true) {
          setSubmissionStatus("Submitted");
        } else {
          setSubmissionStatus("Error");
        }
      })
      .catch((_err: any) => {
        setSubmissionStatus("Error");
      }
      )
  }

  return (
    <div className="w-full p-6 flex flex-col items-center gap-y-4">
      <div className='bg-sky-300/50 px-4 py-2 rounded-sm flex gap-x-3'>

        <button className='text-black p-1 rounded-sm hover:bg-sky-500/70'
          onClick={() => {
            if (allQuestions)
              setQuestion((prev) => {
                if (prev.questionId === 1) return allQuestions.find(question => question.questionId === questionCount)!;
                return allQuestions.find(question => question.questionId === prev.questionId - 1)!;
              });
          }}>
          <IconChevronLeft />
        </button>

        {allQuestions && allQuestions.map((_qstn: QuestionType, ind: number) =>
          <button key={ind}
            onClick={() => {
              setQuestion(() => allQuestions[ind]);
            }}
            className={`text-black border px-2 py-1 transition-all duration-150 rounded-sm hover:bg-sky-500/70 border-transparent`}>
            {ind + 1}
          </button>
        )}

        <button className='text-black p-1 rounded-sm hover:bg-sky-500/70'
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
      <button onClick={() => handleSubmit(answers, userId)} disabled={submissionStatus === "Submitted" || submissionStatus === "Submitting"}
        className='bg-white rounded-sm text-black font-medium px-4 py-1'>
        {submissionStatus}
      </button>
    </div >
  )
}
export default Navbar
