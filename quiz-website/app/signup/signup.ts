'use server';
import { z } from "zod";
import { signupSchema } from "@/schemas";
import { db as prisma } from "@/prisma/client";
import bcrypt from "bcryptjs";
import { sendWelcomeEmail } from "@/lib/email";

export const handleSignup = async (data: z.infer<typeof signupSchema>) => {

  const validatedFields = signupSchema.safeParse(data);
  if (!validatedFields.success) {
    console.log(validatedFields.error.errors);
    return { errors: validatedFields.error.errors };
  }

  const { name, email, password, phone, department, year } = validatedFields.data;

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        email
      }
    })

    if (existingUser) throw "User already exists with given email"

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        phone,
        department,
        year,
      }
    })

    if (!user) throw "Error while creating user. Please try again"
    else await sendWelcomeEmail(email, name);
  } catch (error: any) {
    return { error };
  }

  return { success: true, message: "Signup successful check email for confirmation" };
}
