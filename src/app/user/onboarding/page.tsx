'use client'
import { useBoarding } from "@/store/useBoarding";
import StepOne from '@/app/user/onboarding/components/StepOne'
import StepTwo from "./components/StepTwo";


const Page = () => {
    const {step } = useBoarding()

  return (
    <section className="section">
        <div className="customeContainer flex-col flex items-center justify-center gap-12">
            {
                step === 1 && <StepOne /> ||
                step === 2 && <StepTwo />
            }
        </div>
    </section>
  )
}

export default Page;


{/* <form action="">
                    <label htmlFor="pdf">
                    <input type="radio" name="type" id="pdf" />
                    <span></span>
                    </label>
                </form> */}
