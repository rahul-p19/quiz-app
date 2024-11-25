'use client';
import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import { Question } from '@prisma/client';

function Welcome(){

  const [question, setQuestion] = useState<Question>();
  const [allowNav, setAllowNav] = useState<boolean>(false);

  useEffect(()=>{
      const sse = new EventSource("http://localhost:3001/questions");
      
      sse.onmessage = (ev:MessageEvent) => {
        console.table(ev.data);
      if(ev.data==='close'){
          console.log("closing stream");
        sse.close();
      }
      else if(ev.data === "allowNavigation"){
        setAllowNav(true);
      }
      else if(ev.data === "stopNavigation"){
        setAllowNav(false);
      }
      else
      setQuestion(JSON.parse(ev.data));
    }
  },[])

  return(
    <>
    <div>
      <nav className={`${allowNav? `flex`:`hidden`}`}>navbar</nav>
      <h1>
      Welcome to IEEE JUSB!
      </h1>
      <div className='flex flex-col gap-y-4'>
      <Link href="/login">Login</Link>
      <Link href="/signup">Sign Up</Link>
      </div>
      <div>
        <h1>{question?.statement}</h1>
        <h2>{question?.optiona}</h2>
        <h2>{question?.optionb}</h2>
        <h2>{question?.optionc}</h2>
        <h2>{question?.optiond}</h2>
      </div>
    </div>
    </>
  )
}

// async 
function Page() {
  // const session = await auth();
  // if(!session || !session.user) return <Welcome />

  return (
    // <div>Page</div>
    <Welcome />
  )
}

export default Page