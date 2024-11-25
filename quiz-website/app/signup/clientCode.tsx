"use client";
import React, { useState } from "react";
import { z } from "zod";
import { signupSchema } from "@/schemas";
import { handleSignup } from "./signup";
import { useRouter } from "next/navigation";
import Link from "next/link";

function SignupForm() {
	const router = useRouter();
	const [buttonText, setButtonText] = useState<string>("Sign Up");
	const [signupData, setSignupData] = useState<z.infer<typeof signupSchema>>({
		name: "",
		password: "",
		email: "",
	});

	const [errors, setErrors] = useState<z.infer<typeof signupSchema>>({
		name: "",
		email: "",
		password: "",
	});

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
		setErrors({ name: "", email: "", password: "" });
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
					setButtonText("Redirecting..");
					router.push("/");
				} else {
					setButtonText("Login");
					res?.errors?.map((error) =>
						setErrors((prev) => ({
							...prev,
							[error.path[0]]: `Invalid ${error.path[0]}`,
						}))
					);
					if (res?.error)
						setErrors((prev) => ({ ...prev, password: "Invalid Credentials" }));
					return;
				}
			})
			.finally(() => setButtonText("Sign Up"));
	};

	return (
		<form className="flex flex-col gap-y-6 mt-6" onSubmit={handleSubmit}>
			<div className="flex flex-col">
				<input
					type="text"
					placeholder="Name"
					className="bg-transparent text-accent placeholder:text-sm font-opensans border-b-accent border-b px-2 outline-none"
					value={signupData.name}
					onChange={(e) => handleChange(e, "name")}
				/>
				<p className="text-red-500 text-sm">{errors.name ?? ""}</p>
			</div>
			<div className="flex flex-col">
				<input
					type="text"
					placeholder="Email"
					className="bg-transparent text-accent placeholder:text-sm font-opensans border-b-accent border-b px-2 outline-none"
					value={signupData.email}
					onChange={(e) => handleChange(e, "email")}
				/>
				<p className="text-red-500 text-sm">{errors.email ?? ""}</p>
			</div>
			<div className="flex flex-col">
				<input
					type="password"
					placeholder="Password"
					className="bg-transparent text-accent placeholder:text-sm font-opensans border-b-accent border-b px-2 outline-none text-lg"
					value={signupData.password}
					onChange={(e) => handleChange(e, "password")}
				/>
				<p className="text-red-500 text-sm">{errors.password ?? ""}</p>
			</div>
			<button
				type="submit"
				className="text-white font-opensans px-3 py-1 my-4 rounded-sm w-1/2 self-center">
				{buttonText}
			</button>
			<div className="flex">
				<p>Already have an account?</p>
				<Link href="/login">Login</Link>
			</div>
		</form>
	);
}

export default SignupForm;
