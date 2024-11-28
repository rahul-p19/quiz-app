"use client";
import React, { useState, useEffect } from "react";
import QuestionForm from "./QuestionForm";
import { QuestionType } from "@/schemas";

export default function ClientCode() {
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
	const [questionLive, setQuestionLive] = useState<boolean>(false);

	useEffect(() => {
		// const sse = new EventSource("http://localhost:3001/questions");
		const sse = new EventSource(`${process.env.NEXT_PUBLIC_BACKEND_URL}/questions`);

		sse.onmessage = (ev: MessageEvent) => {
			console.table(ev.data);
			if (ev.data === "close") {
				setQuestionLive(false);
				console.log("Closing Connection to Quiz");
				sse.close();
			} else if (ev.data === "allowNavigation") {
				setQuestionLive(false);
				setAllowNav(true);
			} else if (ev.data === "stopNavigation") {
				setAllowNav(false);
			} else{
				setCurrentQuestion(JSON.parse(ev.data));
				setQuestionLive(true);
			}
		};
	}, []);

	return (
		<>
			<div>
				<nav className={`${allowNav ? `flex` : `hidden`}`}>navbar</nav>
				<h1>Welcome to IEEE JUSB Quiz</h1>
				{allowNav && <div>navigation</div>}
				{questionLive && 
				<QuestionForm question={currentQuestion} /> }
			</div>
		</>
	);
}
