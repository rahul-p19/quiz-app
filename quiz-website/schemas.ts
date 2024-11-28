import { z } from "zod";

export const loginSchema = z.object({
	email: z.string().min(1, "UserId is required."),
	password: z.string().min(1, "Password is required."),
});

export const signupSchema = z.object({
	name: z.string().min(1, "Name is required."),
	password: z.string().min(1, "Password is required."),
	email: z.string().min(1, "Email is required"),
});

export const adminSignupSchema = z.object({
	name: z.string().min(1, "Name is required."),
	password: z.string().min(1, "Password is required."),
	email: z.string().min(1, "Email is required"),
	adminCode: z.string().min(1, "Admin Code is required"),
});

export interface QuestionType {
	questionId: number;
	optiona: string;
	optionb: string;
	optionc: string;
	optiond: string;
	correctOption: "a" | "b" | "c" | "d";
	statement: string;
}
