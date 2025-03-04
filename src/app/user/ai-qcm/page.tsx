'use client'

import FormPrompt from "@/components/ai/FormPrompt"
import QcmsQuestions from "@/components/ai/QcmQuestions"
import { useQcmStore } from "@/store/useQcm"
import { Suspense } from "react"

const Page = () => {
    const {start} = useQcmStore()
  return (
    <section className="section">
        <div className="customeContainer flex items-center justify-center">
        { !start ?
         ( <div className='md:w-1/2 '>
            <Suspense>
          <FormPrompt/>

            </Suspense>
        </div>) : (

            <QcmsQuestions />
          )
        }
        </div>
    </section>
  )
}

export default Page
