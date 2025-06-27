"use client";
import React, { useState } from "react";
import getSuggestions from "./getSuggestions";

type Question = {
  question: string;
  options: string[];
  correct_answer?: string;
};

function Page() {
  const [topic, setTopic] = useState<string>("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      getSuggestions(topic).then((res) => {
        // console.log(res);
        setQuestions(res);
    });
    //   console.log(questions);
    } catch (err) {
      console.error(err);
      alert("Error occurred while generating questions.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen gap-4 bg-black w-full p-8 flex flex-col items-center">
      <h1 className="text-3xl">Generate Questions using AI</h1>
      <form
        className="flex flex-col items-center gap-3"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter Topic"
          disabled={submitting}
          className="px-2 py-1 rounded-sm text-black"
        />
        <button
          type="submit"
          disabled={submitting}
          className="bg-white text-black rounded-sm px-2 py-1"
        >
          Generate
        </button>
      </form>
      {questions && questions.length > 0 && 
      <div className="text-white flex flex-col sm:ml-8 mt-4 gap-y-4">
        {questions.map((question: Question, ind: number)=>
        <div key={ind} className="flex flex-col gap-1">
            <h4 className="text-lg text-blue-200">Q. {question.question}</h4>
            {question.options.map((option:string, i:number)=>
            <p key={i}>{option}</p>)}
            <p className="mt-2 text-blue-300">Correct Option: {question.correct_answer}</p>
        </div>)}
    </div>}
    </div>
  );
}

export default Page;
