"use client";
import React, { useState } from "react";
import { z } from "zod";
import { adminSignupSchema } from "@/schemas";
import { handleSignup } from "./signup";
import { useRouter } from "next/navigation";
import Link from "next/link";

function SignupForm() {
	const router = useRouter();
	const [buttonText, setButtonText] = useState<string>("Sign Up");
	const [signupData, setSignupData] = useState<z.infer<typeof adminSignupSchema>>({
		name: "",
		password: "",
		email: "",
		adminCode: ""
	});

	const [errors, setErrors] = useState<z.infer<typeof adminSignupSchema>>({
		name: "",
		email: "",
		password: "",
		adminCode: ""
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
		setErrors({ name: "", email: "", password: "", adminCode: "" });
		setButtonText("Submitting..");
		const res = adminSignupSchema.safeParse(signupData);
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
			<div className="flex flex-col">
				<input
					type="text"
					placeholder="Admin Code"
					className="bg-transparent text-accent placeholder:text-sm font-opensans border-b-accent border-b px-2 outline-none"
					value={signupData.adminCode}
					onChange={(e) => handleChange(e, "adminCode")}
				/>
				<p className="text-red-500 text-sm">{errors.adminCode ?? ""}</p>
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
