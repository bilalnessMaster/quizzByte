import {create} from 'zustand'

type onBoardingProps = {
    step : number,
    setStep : (step : number) => void;
    setSubject : (subject : string) => void;
    subject : string;
    type : string;
    setType : (type : string) => void

}

export const useBoarding = create<onBoardingProps>((set) => ({
    step : 1,
    subject : '',
    type : 'pdf',
    setStep : (step) => set({step}),
    setSubject : (subject) => set({subject}),
    setType : (type) => set({type})
}))
