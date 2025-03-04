'use client'
import TilteHeader from "@/components/TilteHeader";
import Link from "next/link";
import { authenticate, signInWithGoogle } from "../lib/action";
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import google from '@/assests/google.svg'

const SigninForm = () => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/user';
    const [errorMessage , formAction , isPending] = useActionState(authenticate, undefined)


  return (
    <div  className="space-y-8 w-full md:w-2/5 px-2  ">
      <TilteHeader
        title="Welcome, back 👋"
        description="What are you waiting for, sign in !!"
      />

      <form  action={formAction} className="space-y-2">


        <label htmlFor="email" className="label flex-1">
          <span>Email adresse</span>
          <input

            type="text"
            name="email"
            id="email"
            className="input"
            placeholder="example@gmail.com"
          />
        </label>
        <label htmlFor="password" className="label flex-1  ">
          <span>Password</span>
          <input

            type="password"
            name="password"
            id="password"
            className="input"
            placeholder="ex : NSMKmI&t6s"
          />
        </label>
        <input type="hidden" name="redirectTo" value={callbackUrl} />

        {
            errorMessage && <p className="text-xs font-medium text-red-700 first-letter:capitalize">{errorMessage}</p>
        }
        <button
          type="submit"
          disabled={isPending}
          className=" w-full h-10 rounded-md bg-black flex items-center justify-center font-dm font-medium text-white text-sm "
        >
          {isPending ? (
            <span className="size-5 border-2 border-white/25 rounded-full inline-flex border-t-2 border-t-white animate-spin " />
          ) : (
            "Log in"
          )}
        </button>

        <div className="relative  flex items-center justify-center h-6">
          <span className="absolute size-7 z-10 bg-white font-bricolage items-center justify-center flex rounded-full  ">or</span>
          <div className="h-[1px] w-full bg-neutral-700 rounded-full" />
        </div>
        <button className="w-full flex gap-2 justify-center items-center bg-gray-50 font-medium border border-back py-2 rounded-md shader" type="button"
         onClick={()=>{signInWithGoogle(callbackUrl)}}
         >
         <span>
            <Image src={google} alt='' width={20} height={20} className="object-cover" />
        </span>
         <span>Google</span>
        </button>
        <div className="font-normal text-sm text-gray-500 mt-4">
          <span>Don&apos;t have an account?{" "}</span>
          <Link className=" text-black underline" href={"/auth/sign-up"}>
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};


export default SigninForm;
