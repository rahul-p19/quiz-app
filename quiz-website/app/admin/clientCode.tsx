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
      .then(() => alert("Question set."))
      .catch((err) => alert(`Error occurred: ${err}`));
  } catch (err) {
    alert(`Error occurred: ${err}`);
  }
};

const allowNavigation = () => {
  fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/allowNavigation`, {
    headers: {
      "adminauth": "colepalmer"
    }
  })
    .then(() => alert("allowed navigation"))
    .catch((err) => alert(`Error occurred: ${err}`));
};

const stopNavigation = () => {
  fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stopNavigation`, {
    headers: {
      "adminauth": "colepalmer"
    }
  })
    .then(() => alert("stopped navigation"))
    .catch((err) => alert(`Error occurred: ${err}`));
}

const allowQuestions = () => {
  fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/allowQuestions`, {
    headers: {
      "adminauth": "colepalmer"
    }
  })
    .then(() => alert("allowed questions"))
    .catch((err) => alert(`Error occurred: ${err}`));
};

const stopQuestions = () => {
  fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stopQuestions`, {
    headers: {
      "adminauth": "colepalmer"
    }
  })
    .then(() => alert("stopped questions"))
    .catch((err) => alert(`Error occurred: ${err}`));
};;

const stopQuiz = () => {
  fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stop`, {
    headers: {
      "adminauth": "colepalmer"
    }
  })
    .then(() => alert("quiz stopped"))
    .catch((err) => alert(`Error occurred: ${err}`));
};


function AdminControls() {
  const [questionNo, setQuestionNo] = useState<string>("");
  const [currentQuestionAdmin, setCurrentQuestionAdmin] = useState<string>("");

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
            setCurrentQuestionAdmin(questionNo)
          }}
            className="text-black bg-white px-2 py-1 rounded-[2px]">Set Question</button>
        </form>

        <p>Current Question Number: {currentQuestionAdmin}</p>

        <button onClick={() => stopQuiz()} className="text-white bg-red-500 w-fit px-2 py-1 rounded-[2px]">Stop quiz</button>
      </div>

      <div className="flex flex-col text-center sm:flex-row gap-2 w-full justify-around">
        <button onClick={() => {
          allowNavigation();
        }} className="bg-white text-black px-2 py-1 rounded-[2px]">
          Allow navigation</button>

        <button onClick={() => {
          stopNavigation();
        }} className="bg-white text-black px-2 py-1 rounded-[2px]">Stop navigation</button>
      </div>

      <div className="text-center flex flex-col sm:flex-row gap-2 w-full justify-around">
        <button onClick={() => {
          allowQuestions();
        }} className="bg-white text-black px-2 py-1 rounded-[2px]">
          Allow questions</button>

        <button onClick={() => {
          stopQuestions();
        }}
          className="bg-white text-black px-2 py-1 rounded-[2px]">
          Stop questions</button>
      </div>

    </div>
  );
}

export default AdminControls;
