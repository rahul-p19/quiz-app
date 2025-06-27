'use server'
import {GoogleGenerativeAI} from "@google/generative-ai";

const API_KEY=process.env.GEMINI_API_KEY;

export default async function getSuggestions(topic: string){
    if(!API_KEY) throw Error("API Key Not Found");

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({model:'gemini-2.0-flash-lite'})

    const QUESTIONS_COUNT = 5;

    if(!topic) throw new Error("Topic is required");

     const prompt = `
    Generate ${QUESTIONS_COUNT} multiple-choice questions about "${topic}". Each question should have 4 options (A, B, C, D) and clearly indicate the correct answer.

    Example Format:
    Question 1: What is the capital of France?
    A. Berlin
    B. Paris
    C. Rome
    D. Madrid
    Correct Answer: B

    Question 2: What is photosynthesis?
    A. The process of animals breathing
    B. The process by which plants convert light energy into chemical energy
    C. The process of water evaporating
    D. The process of rocks forming
    Correct Answer: B

    Now, generate ${QUESTIONS_COUNT} questions for "${topic}":
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const rawText = response.text();

    type Question = {
        question: string;
        options: string[];
        correct_answer?: string;
    };

    const questionsList: Question[] = [];
    const lines = rawText.trim().split('\n');
    let currentQuestion: Question | null = null;

    for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith("Question")) {
            if (currentQuestion) {
                questionsList.push(currentQuestion);
            }
            currentQuestion = {
                question: trimmedLine.substring(trimmedLine.indexOf(":") + 2),
                options: []
            };
        } else if (trimmedLine.match(/^[A-D]\./)) { // Matches A., B., C., D.
            if (currentQuestion) {
                currentQuestion.options.push(trimmedLine);
            }
        } else if (trimmedLine.startsWith("Correct Answer:")) {
            if (currentQuestion) {
                currentQuestion.correct_answer = trimmedLine.substring(trimmedLine.indexOf(":") + 2);
            }
        }
    }
    if (currentQuestion) { // Add the last question
        questionsList.push(currentQuestion);
    }
    // console.log(questionsList);
    return questionsList;
}