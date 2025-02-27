'use client'
import React from 'react'
import Background from '../component/Background'
import SignupForm from './signup-form'


const page = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center    ">
    <div className="flex-1 hidden lg:block">
    <Background />
    </div>
    <div className="flex-1 flex justify-center items-center h-full">
        <SignupForm />
    </div>

</div>
  )
}

export default page
