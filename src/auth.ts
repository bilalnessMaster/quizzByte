import NextAuth, { User as UserProps } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { z, ZodError } from "zod";
import Google from "next-auth/providers/google";
import prisma from "@/lib/db";
import bcrypt from 'bcryptjs'
import { User } from "@prisma/client";

const googleClientId = process.env.AUTH_GOOGLE_ID
const googleClientSecret = process.env.AUTH_GOOGLE_SECRET
if (!googleClientId || !googleClientSecret) {
    throw new Error("Google client ID or secret is missing")
}
const formDataSchema = z.object({
    firstName : z.string().min(2),
    lastName : z.string().min(2),
    email: z.string().email(),
    password : z.string().min(6),
    gender : z.enum(['female', 'male'])
})
const signInSchema = formDataSchema.omit({firstName : true , lastName : true , gender :true})
export const getUser = async (email : string , password : string)  =>{
    try {

        const user = await  prisma.user.findUnique({where :{ email}});
        if (!user) throw new Error("User not found")
        const isMatch= await  bcrypt.compare(password, user?.password);
        if(!isMatch) return null;
        return user;
    } catch (error) {
        console.log("while getting user "+error);
        throw new Error("User not found")
    }
}
export const createUser = async ({email, firstName , lastName , gender} :UserProps) =>{
try {
    const user = await prisma.user.create({
        data : {
            email ,
            firstName ,
            lastName ,
            gender
        }
    })
    return user
} catch (error) {
    console.log("while creating user "+error);
    throw new Error("while creating the user");

}
}

function assignUserProperties(user: User, dbUser: User ) {
    user.id = dbUser.id.toString()
    user.email = dbUser.email
    user.firstName = dbUser.firstName
    user.lastName = dbUser.lastName
    user.isAdmin = dbUser.isAdmin
    user.streak = dbUser.streak
    user.gender = dbUser.gender
}



export const { handlers, signIn, signOut, auth ,} = NextAuth({
    pages: {
        signIn: "/auth/sign-in",
    },
    callbacks: {
        async session({session , token}){
            if(token?.sub){
            session.user.id = token.sub ?? ""
            session.user.email = token.email ?? ""
            session.user.firstName = token.firstName ?? ""
            session.user.lastName= token.lastName ?? ""
            session.user.isAdmin = token.isAdmin ?? false
            session.user.streak = token.streak ?? 0
            session.user.gender = token.gender ?? ""
            }
            return session
        },

        async jwt({user ,token}){
            if(user){
                token.id = user.id
                token.gender = user?.gender
                token.firstName = user?.firstName
                token.lastName = user?.lastName
                token.email = user?.email
                token.streak = user?.streak
                token.isAdmin = user?.isAdmin
            }
            return token
        },
        async signIn({user, account , profile}){
            if(account?.provider == "google"){
               const isAlreadyExist = await prisma.user.findUnique({
                where : {email : profile?.email}
               })
               if(isAlreadyExist){
                assignUserProperties(user , isAlreadyExist)
                return !!isAlreadyExist
               }
               const  newUser = await createUser({ email:profile?.email  , firstName : profile?.given_name ,lastName: profile?.family_name , gender : profile?.gender })
               assignUserProperties(user , newUser)
               return !!newUser
            }
            return true;
        },
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnUserRoute = nextUrl.pathname.startsWith('/user');

            if (isOnUserRoute) {
                if(isLoggedIn) return  true;
                return false; // Redirect unauthenticated users via middleware
            }else if(isLoggedIn) {
                return Response.redirect(new URL("/user", nextUrl))
            }
            return true;
        },
      },
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
