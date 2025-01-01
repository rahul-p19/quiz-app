"use client";
import React from "react";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { Cover } from "../ui/cover";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
export function Home() {
  return (
    <div
      id="home"
      className="rounded-md bg-gradient-to-b from-black via-stone-900 to-indigo-800 flex flex-col items-center justify-center relative w-full h-screen"
    >
      <h1 className="relative flex-col md:flex-row z-10 text-3xl md:text-5xl md:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white flex items-center gap-2 md:gap-8">
        <span>Hello</span>
        {/* <span className="text-white text-lg font-thin"></span> */}
        <span>IEEE!</span>
      </h1>
      <h2 className="text-xl md:text-2xl lg:text-3xl px-5 font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
        You've come to say "Hello" to us ? <br />
        Dive into the world where dreams become true, hand in hand with us as we
        attempt to enlighten your path with <br /> <Cover>HELLO IEEE !</Cover>
      </h2>
      <Link href={"/signup"}>
        {" "}
        <button className="relative  inline-flex h-12 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 z-50">
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            Register
            <IconArrowRight className="h-10 w-5 ml-1 -rotate-45 text-white dark:text-neutral-400 group-hover/button:-rotate-12 transition-transform duration-300" />
          </span>
        </button>
      </Link>
      <ShootingStars />
      <StarsBackground />
    </div>
  );
}
