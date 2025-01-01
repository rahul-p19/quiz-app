"use client";
import React, { useState } from "react";
import { z } from "zod";
import { signupSchema } from "@/schemas";
import { handleSignup } from "./signup";
import { useToast } from "@/hooks/use-toast";

function SignupForm() {
  const [buttonText, setButtonText] = useState<string>("Sign Up");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [signupData, setSignupData] = useState<z.infer<typeof signupSchema>>({
    name: "",
    password: "",
    email: "",
    phone: "",
    department: "",
    year: "",
  });

  const [errors, setErrors] = useState<z.infer<typeof signupSchema>>({
    name: "",
    email: "",
    password: "",
    phone: "",
    department: "",
    year: "",
  });

  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setSignupData({
      ...signupData,
      [field]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({
      name: "",
      email: "",
      password: "",
      phone: "",
      department: "",
      year: "",
    });
    setButtonText("Submitting..");
    const res = signupSchema.safeParse(signupData);
    if (!res.success) {
      setButtonText("Sign Up");
      console.log(res.error.errors);
      res.error.errors.map((error) => {
        setErrors((prev) => ({
          ...prev,
          [error.path[0]]: error.message,
        }));
      });
      return;
    }
    handleSignup(signupData)
      .then((res) => {
        if (res?.success) {
          setSuccessMessage(res.message || "Signup successful!");
          toast({
            title: "Sign Up Successful!",
            description: "Check your email for confirmation",
          });
          setButtonText("Success..");
        } else {
          setButtonText("Sign Up");
          res?.errors?.map((error) =>
            setErrors((prev) => ({
              ...prev,
              [error.path[0]]: `Invalid ${error.path[0]}`,
            }))
          );
          if (res?.error) {
            console.log(res.error);
            setErrors((prev) => ({ ...prev, password: "Invalid Credentials" }));
          }
          return;
        }
      })
      .finally(() => setButtonText("Sign Up"));
  };

  return (
    <>
      {successMessage && (
        <div className="text-green-500 text-center mb-4">{successMessage}</div> // Added to display success message
      )}
      <form className="flex flex-col gap-y-6 mt-6" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Name"
            className="bg-transparent text-white placeholder:text-sm font-opensans border-b-accent border-b px-2 outline-none"
            value={signupData.name}
            onChange={(e) => handleChange(e, "name")}
          />
          <p className="text-red-500 text-sm">{errors.name ?? ""}</p>
        </div>
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Email"
            className="bg-transparent text-white placeholder:text-sm font-opensans border-b-accent border-b px-2 outline-none"
            value={signupData.email}
            onChange={(e) => handleChange(e, "email")}
          />
          <p className="text-red-500 text-sm">{errors.email ?? ""}</p>
        </div>
        <div className="flex flex-col">
          <input
            type="password"
            placeholder="Password"
            className="bg-transparent text-white placeholder:text-sm font-opensans border-b-accent border-b px-2 outline-none text-lg"
            value={signupData.password}
            onChange={(e) => handleChange(e, "password")}
          />
          <p className="text-red-500 text-sm">{errors.password ?? ""}</p>
        </div>
        <div className="flex flex-col">
          <input
            type="tel"
            placeholder="Phone"
            className="bg-transparent text-white placeholder:text-sm font-opensans border-b-accent border-b px-2 outline-none"
            value={signupData.phone}
            onChange={(e) => handleChange(e, "phone")}
          />
          <p className="text-red-500 text-sm">{errors.phone ?? ""}</p>
        </div>
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Department"
            className="bg-transparent text-white placeholder:text-sm font-opensans border-b-accent border-b px-2 outline-none"
            value={signupData.department}
            onChange={(e) => handleChange(e, "department")}
          />
          <p className="text-red-500 text-sm">{errors.department ?? ""}</p>
        </div>
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Year"
            className="bg-transparent text-white placeholder:text-sm font-opensans border-b-accent border-b px-2 outline-none"
            value={signupData.year}
            onChange={(e) => handleChange(e, "year")}
          />
          <p className="text-red-500 text-sm">{errors.year ?? ""}</p>
        </div>
        <button
          type="submit"
          className="text-white font-opensans px-3 py-1 my-4 rounded-sm w-1/2 self-center"
        >
          {buttonText}
        </button>
        {/* <div className="flex">
				<p>Already have an account?</p>
				<Link href="/login">Login</Link>
			</div> */}
      </form>
    </>
  );
}

export default SignupForm;
