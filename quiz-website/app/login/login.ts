'use server';
import {z} from "zod";
import { loginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const handleLogin = async (data:z.infer<typeof loginSchema>) => {
    const validatedFields = loginSchema.safeParse(data);
    if(!validatedFields.success){
        return {errors:validatedFields.error.errors};
    }

    const { email, password} = validatedFields.data;

    try {
        await signIn("credentials",{
            email,
            password,
            redirectTo: "/"
        })
    } catch (error) {
        if(error instanceof AuthError){
            if(error.type==="CredentialsSignin"){
                return {error:"Invalid Credentials"}
            }
            else
                return {error:"Something went wrong"}
        }
        throw error;
    }

    return {success:true,message:"Logged In"};
}