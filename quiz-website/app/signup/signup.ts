'use server';
import {z} from "zod";
import { signupSchema } from "@/schemas";
import {db as prisma} from "@/prisma/client";
import bcrypt from "bcryptjs";

export const handleSignup = async (data:z.infer<typeof signupSchema>) => {

    const validatedFields = signupSchema.safeParse(data);
    if(!validatedFields.success){
        return {errors:validatedFields.error.errors};
    }

    const { name, email, password} = validatedFields.data;

    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if(existingUser) throw "User already exists with given email"

        const hashedPassword = await bcrypt.hash(password,12);

        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword
            }
        })

        if(!user) throw "Error while creating user. Please try again"

    } catch (error) {
        return {error};
    }

    return {success:true,message:"Logged In"};
}