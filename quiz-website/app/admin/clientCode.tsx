"use client";
import React, { useState } from "react";

const setQuestion = (questionNo:string) => {
	try {
		const ind = parseInt(questionNo);
		if(!ind) throw "Invalid question number";
		fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/start?ind=${ind}`, {})
		.then(() => console.log("quiz started"))
		.catch((err) => console.error(err));
	} catch (err) {
		console.error(err);
	}
};

const allowNavigation = () => {
	fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/allowNavigation`, {})
		.then(() => console.log("allowed navigation"))
		.catch((err) => console.error(err));
};

const stopNavigation = () => {
	fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stopNavigation`, {})
		.then(() => console.log("stopped navigation"))
		.catch((err) => console.error(err));
};

const stopQuiz = () => {
	fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stop`, {})
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
					onChange={(e)=>setQuestionNo(e.target.value)}
					className="text-black"
				/>
				<button onClick={()=>setQuestion(questionNo)}>Set Question</button>
			</form>

      <button onClick={allowNavigation}>Allow navigation</button>
      
      <button onClick={stopNavigation}>Stop navigation</button>

			<button onClick={stopQuiz} className="text-white bg-red-500 w-fit">Stop quiz</button>
		</div>
	);
}

export default AdminControls;
