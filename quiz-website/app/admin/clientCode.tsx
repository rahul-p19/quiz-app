"use client";
//import { QuestionType } from "@/schemas";
import React, { useState } from "react";

/*const addQuestion = (questionData: QuestionType) => {
  console.log(questionData);
};*/

const setQuestion = (questionNo: string) => {
  try {
    const ind = parseInt(questionNo);
    if (!ind) throw "Invalid question number";
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/start?ind=${ind}`, {
      headers: {
        "adminauth": "colepalmer"
      }
    })
      .then(() => console.log("quiz started"))
      .catch((err) => console.error(err));
  } catch (err) {
    console.error(err);
  }
};

const allowNavigation = () => {
  fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/allowNavigation`, {
    headers: {
      "adminauth": "colepalmer"
    }
  })
    .then(() => console.log("allowed navigation"))
    .catch((err) => console.error(err));
};

const stopNavigation = () => {
  fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stopNavigation`, {
    headers: {
      "adminauth": "colepalmer"
    }
  })
    .then(() => console.log("stopped navigation"))
    .catch((err) => console.error(err));
}

const allowQuestions = () => {
  console.log("allowing questions");
  fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/allowQuestions`, {
    headers: {
      "adminauth": "colepalmer"
    }
  })
    .then(() => console.log("allowed questions"))
    .catch((err) => console.error(err));
};

const stopQuestions = () => {
  console.log("stopping questions");
  fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stopQuestions`, {
    headers: {
      "adminauth": "colepalmer"
    }
  })
    .then(() => console.log("stopped questions"))
    .catch((err) => console.error(err));
};;

const stopQuiz = () => {
  fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stop`, {
    headers: {
      "adminauth": "colepalmer"
    }
  })
    .then(() => console.log("quiz stopped"))
    .catch((err) => console.error(err));
};


function AdminControls() {
  const [questionNo, setQuestionNo] = useState<string>("");
  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  const [allowNav, setAllowNav] = useState<boolean>(false);
  const [questionLive, setQuestionLive] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-y-6 my-8">
      <div className="flex flex-col sm:flex-row gap-2 w-full justify-around">
        <form className="flex flex-col sm:flex-row gap-2">
          <input
            type="string"
            placeholder="Question Number (1-20)"
            value={questionNo}
            onChange={(e) => setQuestionNo(e.target.value)}
            className="text-black px-2 py-1"
          />
          <button onClick={(e: React.FormEvent) => {
            e.preventDefault();
            setQuestion(questionNo);
            setCurrentQuestion(questionNo)
          }}
            className="text-black bg-white px-2 py-1 rounded-[2px]">Set Question</button>
        </form>

        <p>Current Question Number: {currentQuestion}</p>

        <button onClick={() => stopQuiz()} className="text-white bg-red-500 w-fit px-2 py-1 rounded-[2px]">Stop quiz</button>
      </div>

      <div className="flex flex-col text-center sm:flex-row gap-2 w-full justify-around">
        <button onClick={() => {
          allowNavigation();
          setAllowNav(true);
        }} className="bg-white text-black px-2 py-1 rounded-[2px]">
          Allow navigation</button>

        <p>Navigation: {allowNav ? "Allowed" : "Stopped"}</p>

        <button onClick={() => {
          stopNavigation();
          setAllowNav(false);
        }} className="bg-white text-black px-2 py-1 rounded-[2px]">Stop navigation</button>
      </div>

      <div className="text-center flex flex-col sm:flex-row gap-2 w-full justify-around">
        <button onClick={() => {
          allowQuestions();
          setQuestionLive(true);
        }} className="bg-white text-black px-2 py-1 rounded-[2px]">
          Allow questions</button>

        <p>Questions: {questionLive ? "Live" : "Stopped"}</p>

        <button onClick={() => {
          stopQuestions();
          setQuestionLive(false);
        }}
          className="bg-white text-black px-2 py-1 rounded-[2px]">
          Stop questions</button>
      </div>

    </div>
  );
}

export default AdminControls;
