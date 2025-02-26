import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { ZodError } from "zod";
import Google from "next-auth/providers/google";
import { authConfig, getUser, signInSchema } from "@/auth.config";
const googleClientId = process.env.AUTH_GOOGLE_ID
const googleClientSecret = process.env.AUTH_GOOGLE_SECRET
if (!googleClientId || !googleClientSecret) {
    throw new Error("Google client ID or secret is missing")
}




export const { handlers, signIn, signOut, auth ,} = NextAuth({
    ...authConfig ,
    providers: [
    Credentials({
        credentials : {
            email: {},
            password: {},
        },
        authorize : async (credentials) => {

        try {
        const validation= signInSchema.safeParse({
            ...credentials
        })
        if(!validation.success){
            throw new Error('Invalid credentials');
        }
        const {email , password }=validation.data
        const user = await getUser(email, password)
        if(!user) throw new Error('Invalid credentials');


        return user
        } catch (error) {
        if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null
          }
         }
        }
    }),
    Google({
        clientId: googleClientId,
        clientSecret: googleClientSecret,
    })
  ],

})
