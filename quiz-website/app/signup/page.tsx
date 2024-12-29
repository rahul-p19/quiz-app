import SignupForm from "./clientCode";
import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

async function Signup() {
  const session = await auth();
  if(session && session.user.role=='ADMIN') redirect("/admin");
  if(session && session.user.role=='USER') redirect("/");
  // console.log(session);
	return (<><main className="flex flex-col justify-center items-center h-full">
    <div className="bg-gradient-to-tr from-[#00000040] via-[#00000020] to-secondary backdrop-blur-lg border border-[#ffffff40] rounded-xl shadow-lg p-6 mx-2 max-w-sm flex flex-col items-center gap-y-4">
      <SignupForm />
    </div>
  </main><ShootingStars/><StarsBackground/></>);
}

export default Signup;