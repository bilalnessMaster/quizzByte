'use server'

import { AuthError } from "next-auth";
import { z } from "zod";
import User from "@/models/User.model";
import dbConnect from "@/lib/db";
import { signIn, signOut } from "@/auth";
import { State } from "@/types/types";
function handleAuthError(error: unknown): string {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials."
        default:
          return "Something went wrong during authentication."
      }
    }
    throw error
  }
const formDataSchema = z.object({
    firstName : z.string().min(2),
    lastName : z.string().min(2),
    email: z.string().email(),
    password : z.string().min(6),
    gender : z.enum(['female', 'male'])
})
const signInSchema = formDataSchema.omit({firstName : true , lastName : true , gender : true})
export const  authenticate = async (prevState : string | undefined, formData : FormData) =>{
    const validation = signInSchema.safeParse({
        email : formData.get("email") ,
        password  : formData.get("password")
    })


    try {
        if(!validation.success){
            return "make you enter everything correct"
        }
        await signIn('credentials', formData)

    } catch (error) {
        console.log(error);
        return handleAuthError(error)
}
}
export const handleLogout= async () =>{
        await signOut({redirectTo: '/auth/sign-in'  })
}



export const signInWithGoogle = async (callbackUrl: string) => {
    try {

        await signIn('google' , { redirectTo: callbackUrl  })

    } catch (error) {
        console.log(error);
        return handleAuthError(error)
    }
}


export const createAccountWithCredentials = async (prevState : State, formData : FormData) =>{
    try {
        const validation = formDataSchema.safeParse({
            email : formData.get("email") ,
            password  : formData.get("password"),
            firstName : formData.get('firstName'),
            lastName : formData.get("lastName"),
            gender : formData.get('gender')
        })

        if(!validation.success){
            return {
                errors : validation.error.flatten().fieldErrors,
                message : "Please fill out all fields correctly."
            }
        }
        await dbConnect()
        const {email,password,firstName,lastName,gender } = validation.data
        const isAlreadyExist = await User.findOne({email})
        if(isAlreadyExist) return {message : "An account with this email already exists."}
        const user = await User.create({
            email,password,firstName,lastName, gender
        })
        if(!user) return {message : "Failed to create user."}
        return {
            message : "Account created successfully.",
        }
    } catch (error) {
        console.log(error);

        return {
            message : "Something went wrong "
        }
    }
}
