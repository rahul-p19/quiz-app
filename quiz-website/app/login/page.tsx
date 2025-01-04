import LoginForm from "./clientCode";
import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

async function Login() {
  // Redirect to /Bidder if logged in as user
  // Redirect to /admin if logged in as admin
  const session = await auth();
  if (session && session.user.role == 'ADMIN') redirect("/admin");
  if (session && session.user.role == 'USER') redirect("/");
  // console.log(session);
  return (
    <main className="flex flex-row justify-center items-center w-full h-screen">
      <div className="w-1/2 h-full bg-white hidden md:block">
        <BackgroundBeamsWithCollision>
          <h2 className="text-2xl relative px-8 z-20 md:text-5xl font-bold text-center text-white tracking-tight">
            {/* What&apos;s cooler than Beams?{" "} */}
            From dark pits of oblivion to the hallows of glory,
            <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
              <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
                <span className="">
                  Begin this galactic <br /> event with a bang !
                </span>
              </div>
              <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
                <span className="">
                  Begin this galactic <br /> event with a bang !
                </span>
              </div>
            </div>
          </h2>
        </BackgroundBeamsWithCollision>
      </div>
      <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center">
        <div className="bg-[#000] rounded-xl shadow-lg p-6 mx-2 max-w-sm flex flex-col items-center gap-y-4 border-white border">
          <LoginForm />
        </div>
      </div>
    </main>
  )
}

export default Login;
