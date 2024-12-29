import React from 'react'
import { GoogleGeminiEffectDemo } from '@/components/Gemini-Signup'
import { Home } from '@/components/Hero-section'
import { Timelines } from '@/components/Timelines'
import {Navbar} from '@/components/Navigation/Navbar'
function Page() {
  return (
    <>
      <Navbar/>
      <main>
      <Home />
      <Timelines/>
      <GoogleGeminiEffectDemo />
      </main>
    </>
  )
}

export default Page