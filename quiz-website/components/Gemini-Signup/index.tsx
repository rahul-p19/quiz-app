"use client";
import { useScroll, useTransform } from "framer-motion";
import React from "react";
import { GoogleGeminiEffect } from "../ui/google-gemini-effect";
import Link from "next/link";

export function GoogleGeminiEffectDemo() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

  return (
    <div
      id="quiz"
      className="h-fit md:h-[400vh] bg-gradient-to-b from-[#000080] to-[#000] w-full dark:border dark:border-white/[0.1] rounded-md relative pt-20 overflow-clip"
      ref={ref}
    >
      <div className="md:hidden flex flex-col gap-4 items-center justify-center h-full my-4 mb-8">
        <p className="text-4xl  font-extrabold pb-4 text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-300">
          {`INFINIT IEEE!`}
        </p>
        <p className="text-xl font-normal text-center text-neutral-400 mt-4 max-w-xs mx-auto">
          Ready to launch into an infinite universe of ideas and technology?
          InfinitIEEE promises to take you on an experience designed to ignite
          your curiosity. Courageous enough to take your first step? Click below
          to unlock your adventure!
        </p>
        <Link href={"/quiz"}>
          <button className="font-bold  bg-white rounded-full px-4 py-2 mt-4 text-base text-black w-fit mx-auto ">
            Dive in!
          </button>
        </Link>
      </div>
      <div className="hidden md:block sticky top-14 h-screen">
        <GoogleGeminiEffect
          pathLengths={[
            pathLengthFirst,
            pathLengthSecond,
            pathLengthThird,
            pathLengthFourth,
            pathLengthFifth,
          ]}
        />
      </div>
    </div>
  );
}
