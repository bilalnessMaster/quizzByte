import { StaticImageData } from "next/image"
declare module "next-auth" {

    interface User {
    id?:string | null ,
    firstName?: string ,
    lastName?:string ,
    email?: string | null,
    isAdmin?: boolean ,
    gender?: string ,
    streak?: number ,
    password?:string
    isAdmin? : boolean
    }

    interface Session {

    }
  }


  import { JWT } from "next-auth/jwt"

  declare module "next-auth/jwt" {

    interface JWT {
        id?:string,
        firstName?: stringl  ,
        lastName?:string  ,
        email?: string| null ,
        isAdmin?: boolean  ,
        gender?: string,
        streak?: number,
        password?:string
        isAdmin? : boolean
        idToken?: string
    }
  }


export interface UserProps {
    id?:string,
    firstName?: string ,
    lastName?:string ,
    email?: string ,
    isAdmin?: boolean ,
    gender?: string ,
    streak?: number ,
    password?:string
    isAdmin? : boolean
}

export  interface genderProp{
    gender : 'female' | 'male' ,
    img : StaticImageData
}

export interface State{
    errors?: {
        email?: string[];
        password?: string[];
        firstName ? : string[]
        lastName ? : string[]
      };
    message?: string
}
