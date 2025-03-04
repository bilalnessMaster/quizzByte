'use client'
import { Suspense } from "react"
import Background from "../component/Background"
import SigninForm from "./SignIn-form"


const page = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center  ">
        <div className="flex-1 hidden lg:block ">
        <Background />
        </div>
        <div className="flex-1 flex justify-center items-center h-full ">
            <Suspense>

            <SigninForm />
            </Suspense>


        </div>

    </div>
  )
}

export default page
