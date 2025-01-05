"use client";
import React, { useState, useEffect } from "react";
import { QuestionType } from "@/schemas";
import QuestionForm from "./QuestionForm";
import { QuizContext } from "./QuizContext";
import Navbar from "./Navbar";
import { StarsBackground } from "@/components/ui/stars-background";
import { signOut } from '@/auth'

export default function ClientCode({ userId }: { userId: string }) {
  const [currentQuestion, setCurrentQuestion] = useState<QuestionType>({
    questionId: 0,
    optiona: "",
    optionb: "",
    optionc: "",
    optiond: "",
    correctOption: "a",
    statement: "",
    marks: 0
  });

  const [allowNav, setAllowNav] = useState<boolean>(false);
  const [questionLive, setQuestionLive] = useState<boolean>(false);
  const [connected, setConnected] = useState<boolean>(false);

  const [answers, setAnswers] = useState<string[]>(["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]);

  useEffect(() => {

    const localAnswers = localStorage.getItem("answers") ?? "";
    if (localAnswers !== "")
      setAnswers(JSON.parse(localAnswers));

    const localAllowNav = localStorage.getItem("allowNav") ?? "false";
    if (localAllowNav !== "")
      setAllowNav(JSON.parse(localAllowNav));

    const localQuestionLive = localStorage.getItem("questionLive") ?? "false";
    if (localQuestionLive !== "")
      setQuestionLive(() => JSON.parse(localQuestionLive) === "true" ? true : false);

    // const sse = new EventSource("http://localhost:3001/questions");
    const sse = new EventSource(`${process.env.NEXT_PUBLIC_BACKEND_URL}/questions`);

    sse.onopen = () => {
      setConnected(true);
    }

    sse.onerror = () => {
      setConnected(false);
    }

    sse.onmessage = (ev: MessageEvent) => {
      //console.table(ev.data);
      if (ev.data === "close") {
        setQuestionLive(false);
        localStorage.setItem("questionLive", "false");
        console.log("Closing Connection to Quiz");
        sse.close();
      }

      else if (ev.data === "allowNavigation") {
        setQuestionLive(true);
        localStorage.setItem("questionLive", "true");
        setAllowNav(true);
        localStorage.setItem("allowNav", "true");
      }

      else if (ev.data === "stopNavigation") {
        setAllowNav(false);
        localStorage.setItem("allowNav", "false");
      }

      else if (ev.data === "stopQuestions") {
        setQuestionLive(false);
        localStorage.setItem("questionLive", "false");
      }

      else if (ev.data === "allowQuestions") {
        setQuestionLive(true);
        localStorage.setItem("questionLive", "true");
      }

      else {
        setCurrentQuestion(JSON.parse(ev.data));
        setQuestionLive(true);
        localStorage.setItem("questionLive", "true");
      }
    };
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-black/10 via-stone-900/50 to-blue-950/70">
        <QuizContext.Provider value={{ answers, setAnswers, setQuestion: setCurrentQuestion, question: currentQuestion }}>
          <p className={`fixed top-5 left-3 px-2 py-1 rounded-sm ${connected && (questionLive || allowNav) ? "bg-blue-950" : "bg-gray-400"}`}>{connected && (questionLive || allowNav) ? "Live" : "Offline"}</p>
          <div className="flex justify-center items-center p-4">
            <h1 className="text-4xl mr-2 sm:mr-0 md:text-6xl font-bold ">InfitIEEE</h1>
          </div>
          <button className='bg-red-600 rounded-sm px-2 py-1 fixed right-2 top-5' onClick={() => signOut({ redirect: true, redirectTo: "/" })}>Logout</button>
          {(questionLive && currentQuestion.questionId !== 0) &&
            <QuestionForm question={currentQuestion} />}
          {allowNav && <Navbar answers={answers} userId={userId} />}
        </QuizContext.Provider>
        <StarsBackground className="-z-10" />
      </div>
    </>
  );
}
