import React from 'react'
import { Question } from '@prisma/client'

function QuestionForm(question:Question) {
  return (
    <div>
        <h1>Question Form</h1>
        <p>{question.statement}</p>
    </div>
  )
}

export default QuestionForm