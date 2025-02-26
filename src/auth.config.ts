import type { NextAuthConfig } from 'next-auth';
import prisma from './lib/db';
import { UserProps } from './types/types';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
// https://nextjs.org/learn/dashboard-app/adding-metadata

const formDataSchema = z.object({
    firstName : z.string().min(2),
    lastName : z.string().min(2),
    email: z.string().email(),
    password : z.string().min(6),
    gender : z.enum(['female', 'male'])
})
export const signInSchema = formDataSchema.omit({firstName : true , lastName : true , gender :true})
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

function assignUserProperties(user: UserProps, dbUser: UserProps ) {
    user.id = dbUser.id.toString()
    user.email = dbUser.email
    user.firstName = dbUser.firstName
    user.lastName = dbUser.lastName
    user.isAdmin = dbUser.isAdmin
    user.streak = dbUser.streak
    user.gender = dbUser.gender
}
export const authConfig = {
  pages: {
    signIn: '/auth/sign-in',
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
            assignUserProperties(token , user)
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
  providers: [],
} satisfies NextAuthConfig;
