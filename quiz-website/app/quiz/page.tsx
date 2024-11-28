import { auth } from '@/auth'
import ClientCode from '@/app/quiz/ClientCode';
import { redirect } from 'next/navigation';
import React from 'react'

async function QuizPage() {
    const session = await auth();
    if(!session || !session.user) redirect("/login");

  return (
    <ClientCode />
  )
}

export default QuizPage