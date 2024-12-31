import SignupForm from "./clientCode";
import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

async function Signup() {
  const session = await auth();
  if(session && session.user.role=='ADMIN') redirect("/admin");
  if(session && session.user.role=='USER') redirect("/");
  // console.log(session);
	return <main className="flex flex-row justify-center items-center h-screen bg-gradient-to-b from-[#000080] to-[#0000FF]">
    <div className="bg-[#000] rounded-xl shadow-lg p-6 mx-2 max-w-sm flex flex-col items-center gap-y-4">
      <SignupForm />
    </div>
  </main>;
}

export default Signup;