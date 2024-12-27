import React, { useContext, useEffect, useState } from 'react'
import { QuizContext } from "./QuizContext";
import { getAllQuestions } from "./getQuestions";
import { QuestionType } from '@/schemas';
import submitQuiz from './submitQuiz';


function Navbar({ answers, userId }: { answers: string[], userId: string }) {
  const [allQuestions, setAllQuestions] = useState<QuestionType[]>();
  const [submissionStatus, setSubmissionStatus] = useState<string>("Submit");
  const myContext = useContext(QuizContext);

  const setQuestion = myContext!.setQuestion;

  useEffect(() => {
    getAllQuestions()
      .then(res => {
        console.log(res);
        //setAllQuestions(res);
      });
  }, [])

  const handleSubmit = (answers: string[], userId: string) => {
    console.log("submitting: ", answers);
    setSubmissionStatus("Submitting");
    submitQuiz(answers, userId)
      .then((res: { ok: boolean }) => {
        if (res.ok === true) {
          setSubmissionStatus("Submitted");
        } else {
          setSubmissionStatus("Try again");
        }
      })
      .catch((_err: any) => {
        setSubmissionStatus("Try again");
      }
      )
  }


  return (
    <div>
      <div>
        {allQuestions && allQuestions.map((_qstn: QuestionType, ind: number) =>
          <button key={ind}
            onClick={() => setQuestion(() => allQuestions[ind])}
            className='bg-white text-black p-2'>
            {ind + 1}
          </button>
        )}
      </div>
      <button onClick={() => handleSubmit(answers, userId)} disabled={submissionStatus === "Submitted" || submissionStatus === "Submitting"}>
        {submissionStatus}
      </button>
    </div>
  )
}

export default Navbar
