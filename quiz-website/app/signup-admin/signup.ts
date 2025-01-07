'use server';
import { z } from "zod";
import { adminSignupSchema } from "@/schemas";
import { db as prisma } from "@/prisma/client";
import bcrypt from "bcryptjs";

export const handleSignup = async (data: z.infer<typeof adminSignupSchema>) => {

  const validatedFields = adminSignupSchema.safeParse(data);
  if (!validatedFields.success) {
    return { errors: validatedFields.error.errors };
  }

  const { name, email, password, phone, department, year, adminCode } = validatedFields.data;

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        email
      }
    })

    if (existingUser) throw "User already exists with given email"

    if (adminCode !== process.env.ADMIN_CODE) throw "Wrong admin code"

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: "ADMIN",
        phone,
        department,
        year
      }
    })

    if (!user) throw "Error while creating user. Please try again"

  } catch (error) {
    return { error };
  }

  return { success: true, message: "Logged In" };
}
