"use client";
import React, { useState, useEffect } from "react";
import { QuestionType } from "@/schemas";
import QuestionForm from "./QuestionForm";
import { QuizContext } from "./QuizContext";
import Navbar from "./Navbar";
import Logout from "@/components/Logout";

export default function ClientCode({ userId }: { userId: string }) {
  const [currentQuestion, setCurrentQuestion] = useState<QuestionType>({
    questionId: 0,
    optiona: "",
    optionb: "",
    optionc: "",
    optiond: "",
    correctOption: "a",
    statement: ""
  });

  const [allowNav, setAllowNav] = useState<boolean>(false);
  //const [questionLive, setQuestionLive] = useState<boolean>(true);
  const [questionLive, setQuestionLive] = useState<boolean>(false);

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
      <div>
        <QuizContext.Provider value={{ answers, setAnswers, setQuestion: setCurrentQuestion }}>
          <div>
            <h1>Welcome to IEEE JUSB Quiz</h1>
            <Logout />
          </div>
          {allowNav && <Navbar answers={answers} userId={userId} />}
          {questionLive &&
            <QuestionForm question={currentQuestion} />}
        </QuizContext.Provider>
      </div>
    </>
  );
}
