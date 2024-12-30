import React from 'react'
import { GoogleGeminiEffectDemo } from '@/components/Gemini-Signup'
import { Home } from '@/components/Hero-section'
import { Timelines } from '@/components/Timelines'
import {Navbar} from '@/components/Navigation/Navbar'
import {Footer} from '@/components/footer'
import { About } from '@/components/about/page'
import { Speakers } from '@/components/speakers/page'
import Venue from '@/components/venue/page'
function Page() {
  return (
    <>
      <Navbar/>
      <main>
      <Home />
      <About/>
      <Timelines/>
      <Venue/>
      <Speakers/>
      <GoogleGeminiEffectDemo />
      <Footer/>
      </main>
    </>
  )
}

export default Page