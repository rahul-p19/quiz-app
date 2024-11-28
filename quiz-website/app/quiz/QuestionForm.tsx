import React from 'react'
import { QuestionType } from '@/schemas';

function QuestionForm({question}:{question:QuestionType}) {
  return (
    <div>
        <h1>{question.statement}</h1>
        <form>
          <input type="radio" name="answer" id="a" />
          <label htmlFor="a">{question.optiona}</label>

          <input type="radio" name="answer" id="b" />
          <label htmlFor="b">{question.optionb}</label>

          <input type="radio" name="answer" id="c" />
          <label htmlFor="c">{question.optionc}</label>

          <input type="radio" name="answer" id="d" />
          <label htmlFor="d">{question.optiond}</label>
        </form>
    </div>
  )
}

export default QuestionForm