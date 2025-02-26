'use client'
import { toast, Toaster } from "sonner";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { motion } from "framer-motion";
import TilteHeader from "@/components/TilteHeader";
import Link from "next/link";
import Image from 'next/image';
import { gender } from "@/constants/formsData";
import { createAccountWithCredentials, signInWithGoogle } from "../lib/action";
import { State } from "@/types/types";




const SignupForm = () => {
  const [currentGender, setCurrentGender] = useState("female");
    const initialState : State = { message : '' , errors : {}}
        const [state  , formAction , isPending] = useActionState(createAccountWithCredentials, initialState)
        useEffect(() => {
            if (state.message) {
              if (state.message === "User created successfully") {
                toast.success(state.message);
              } else {
                toast.error(state.message);
              }
            }
          }, [state]);

  return (
    <section className="space-y-8 px-2 w-full sm:w-2/5 ">
        <Toaster />
      <TilteHeader
        title="hey , hello 👋"
        description="Join our platform for creating and managing professional quizzes and QCMs"
      />

      <form action={formAction} className="space-y-2 ">
        <div className="w-full flex justify-center gap-2 items-center mb-11">
          <button
            type="button"
            onClick={() =>
              setCurrentGender(currentGender === "female" ? "male" : "female")
            }
          >
            <ChevronLeft size={30} />
          </button>
          <div  className="size-20 bg-indigo-500 rounded-full flex overflow-hidden ">
            {gender.map(({ gender, img }) => (
                currentGender === gender && (
                    <motion.div
                    key={gender}
                    initial={{
                        opacity : 0
                    }}
                    animate={{
                        opacity : 1
                    }}
                    >
                        <Image src={img} className='object-cover h-full ' width={237} height={316}  alt={gender} />

                    </motion.div>
                )

            ))}
          </div>
          <input type="hidden" name="gender" value={currentGender} />
          <button
            type="button"
            onClick={() =>
              setCurrentGender(currentGender === "female" ? "male" : "female")
            }
          >
            <ChevronRight size={30} />
          </button>
        </div>
        <div className="grid grid-cols-2 items-center gap-2 ">
          <label htmlFor="firstName" className="label flex-1 ">
            <span>First Name</span>
            <input

              type="text"
              name="firstName"
              id="firstName"
              className="input "
              placeholder="John"
            />
          </label>
          <label htmlFor="lastName" className="label flex-1">
            <span>Last Name</span>
            <input

type="text"
name="lastName"
id="lastName"
className="input"
placeholder="Smith"
/>
          </label>
        </div>
        <div className="grid grid-cols-2 text-xs text-red-700">
        {
    state?.errors?.firstName && state?.errors?.firstName.map((error , index)=><p key={index}>
        {error}
    </p>)
}
{
    state?.errors?.lastName && state.errors?.lastName.map((error ,index)=><p key={index} >
        {error}
    </p>)
}
        </div>
        <label htmlFor="email" className="label">
          <span>Email</span>
          <input

            type="text"
            name="email"
            id="email"
            className="input"
            placeholder="example@gmail.com"
          />
        </label>
        {
    state.errors?.email && state.errors.email.map((error,index)=><p key={index} className="text-xs text-red-700">
        {error}
    </p>)
}
        <label htmlFor="password" className="label ">
          <span>Password</span>
          <input

            type="password"
            name="password"
            id="password"
            className="input"
            placeholder="ex : NSMKmI&t6s"
          />
        </label>
        {
    state.errors?.password && state.errors.password.map((error,index)=><p key={index} className="text-xs text-red-700">
        {error}
    </p>)
}
        <button
          type="submit"

          className=" w-full h-10 rounded-md bg-black text-sm flex items-center justify-center font-dm font-medium text-white"
        >
          {isPending ? (
            <span className="size-5 border-2 border-white/25 rounded-full inline-flex border-t-2 border-t-white animate-spin " />
          ) : (
            "Sign up"
          )}
        </button>
        <div className="relative  flex items-center justify-center h-6">
                  <span className="absolute size-7 z-10 bg-white font-bricolage items-center justify-center flex rounded-full  ">or</span>
                  <div className="h-[1px] w-full bg-neutral-700 rounded-full" />
                </div>
                <button className="w-full flex gap-2 justify-center items-center bg-gray-50 font-medium border border-back py-2 rounded-md shader" type="button"
                 onClick={()=>{signInWithGoogle('/user')}}
                 >
                 <span>
                    <Google />
                </span>
                 <span>Google</span>
                </button>
        <div className="max-w-md text-sm text-gray-500 mt-4">
          By confirming your email , you agree to our{" "}
          <Link href={"/terms"} className="font-medium underline text-neutral-800">
            Terms of serveice
          </Link>{" "}
          and that you read and understood our{" "}
          <Link className="font-medium underline" href={"/policy"}>
            Privacy Policy{" "}
          </Link>
        </div>
        <div className="font-normal text-sm text-gray-500 mt-4">
          Your already have an account{" "}
          <Link className="underline text-black "href={"/auth/sign-in"}>
            Sign in
          </Link>
        </div>
      </form>

    </section>
  );
};

export default SignupForm

const Google = () => {
    return (
        <svg width="20" height="20" viewBox="0 0 294 300" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M150 122.729V180.82H230.727C227.183 199.502 216.545 215.321 200.59 225.957L249.272 263.731C277.636 237.55 294 199.094 294 153.412C294 142.776 293.046 132.548 291.273 122.73L150 122.729Z" fill="#4285F4"/>
<path d="M65.9342 178.553L54.9546 186.958L16.0898 217.23C40.7719 266.185 91.3596 300.004 149.996 300.004C190.496 300.004 224.45 286.64 249.269 263.731L200.587 225.958C187.223 234.958 170.177 240.413 149.996 240.413C110.996 240.413 77.8602 214.095 65.9955 178.639L65.9342 178.553Z" fill="#34A853"/>
<path d="M16.0899 82.7734C5.86309 102.955 0 125.728 0 150.001C0 174.273 5.86309 197.047 16.0899 217.228C16.0899 217.363 66.0004 178.5 66.0004 178.5C63.0004 169.5 61.2272 159.955 61.2272 149.999C61.2272 140.043 63.0004 130.498 66.0004 121.498L16.0899 82.7734Z" fill="#FBBC05"/>
<path d="M149.999 59.7279C172.091 59.7279 191.727 67.3642 207.409 82.0918L250.364 39.1373C224.318 14.8647 190.5 0 149.999 0C91.3627 0 40.7719 33.6821 16.0898 82.7738L65.9988 121.502C77.8619 86.0462 110.999 59.7279 149.999 59.7279Z" fill="#EA4335"/>
</svg>
    )
}
