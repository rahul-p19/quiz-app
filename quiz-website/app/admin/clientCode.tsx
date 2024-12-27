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
  fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/allowQuestions`, {
    headers: {
      "adminauth": "colepalmer"
    }
  })
    .then(() => console.log("allowed questions"))
    .catch((err) => console.error(err));
};

const stopQuestions = () => {
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



  return (
    <div className="flex flex-col gap-y-4">
      <h1>AdminControls</h1>
      <form>
        <input
          type="string"
          value={questionNo}
          onChange={(e) => setQuestionNo(e.target.value)}
          className="text-black"
        />
        <button onClick={() => setQuestion(questionNo)}>Set Question</button>
      </form>

      <button onClick={allowNavigation}>Allow navigation</button>

      <button onClick={stopNavigation}>Stop navigation</button>

      <button onClick={allowQuestions}>Allow questions</button>

      <button onClick={stopQuestions}>Stop questions</button>

      <button onClick={stopQuiz} className="text-white bg-red-500 w-fit">Stop quiz</button>
    </div>
  );
}

export default AdminControls;
