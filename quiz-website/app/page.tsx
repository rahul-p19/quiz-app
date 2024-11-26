import React from 'react'
import Link from 'next/link'
import { auth } from '@/auth';
import ClientCode from '@/components/Homepage/ClientCode';

function Welcome(){
  return(
    <div>
      <h1>Welcome to IEEE JUSB</h1>
      <Link href="/login">Login</Link>
      <Link href="/signup">Signup</Link>
    </div>
  )
}

async function Page() {
  const session = await auth();
  if(!session || !session.user) return <Welcome />

  return (
    <ClientCode />
  )
}

export default Page