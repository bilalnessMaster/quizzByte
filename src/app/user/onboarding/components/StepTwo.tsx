'use client'

import { useBoarding } from "@/store/useBoarding"
import { useRouter } from "next/navigation"

const types =[
    {
        id : 1,
        title : 'QCM sans document téléchargé' ,
        qcmType : 'text'
    },
    {
        id : 2,
        title : 'QCM avec document téléchargé' ,
        qcmType : 'pdf'
    }
]

const StepTwo = () => {
    const router = useRouter()
    const {setStep , setType  , type:mainType, subject} = useBoarding()
    const handleSuivant = () =>{
        if(mainType === 'text'){
            router.push(`/user/ai-qcm?subject=${subject}`)
        }else{
            // router.push('/user/ai-qcm')
        }
    }
    return (
    <div className="flex flex-col gap-4">
        <h1 className=" text-xl">On me donne un exercice</h1>
            <ul className="flex flex-col gap-2">
                {
                    types.map((type) =>(
                        <li key={type.id}  className="flex items-center gap-2">
                            <input type="radio" onChange={() => setType(type.qcmType)} checked={mainType === type.qcmType} value={type.qcmType}  name="type" className="radio" id={type.qcmType} />
                            <label htmlFor={type.qcmType}>{type.title}</label>
                        </li>
                    ))
                }

            </ul>
            <div className="flex gap-2 justify-between items-center" >
               <button onClick={() => setStep(1)}>
                        Precedent
               </button>
            <button disabled={mainType === ''} onClick={handleSuivant}>
                    Suivant
                </button>
            </div>
    </div>
  )
}

export default StepTwo
