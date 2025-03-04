import { useBoarding } from "@/store/useBoarding";
import { Calculator,  Atom, BookOpen, Globe, Feather, Code, Languages, Dna, History, FlaskConical } from "lucide-react";

const subjects = [
    { id: 1, icon: <Calculator />, name: "Mathématiques" },
    { id: 2, icon: <FlaskConical />, name: "Chimie" },
    { id: 3, icon: <Atom />, name: "Physique" },
    { id: 4, icon: <BookOpen />, name: "Littérature" },
    { id: 5, icon: <Globe />, name: "Géographie" },
    { id: 6, icon: <Feather />, name: "Philosophie" },
    { id: 7, icon: <Code />, name: "Informatique" },
    { id: 8, icon: <Languages />, name: "Langues étrangères" },
    { id: 9, icon: <Dna />, name: "Biologie" },
    { id: 10, icon: <History />, name: "Histoire" },
];

const StepOne = () => {
    const {setSubject , setStep ,subject : mainSubject} = useBoarding()
  return (
            <div className="flex flex-col gap-4">

                <div className="flex justify-center items-center text-2xl font-medium">
                    <h1>Je veux apprendre...</h1>
                </div>
                <ul className="container max-w-4xl grid grid-cols-4 gap-2  max-h-[500px] [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent),linear-gradient(to_top,transparent,black_10%,black_90%,transparent)] overflow-y-auto overflow-x-hidden scrollbar px-3" >
                    {
                        subjects.map((subject , index) => (
                            <li key={index} className="bg-neutral-50">

                                <input type='radio' name='subject' checked={subject.name === mainSubject} onChange={() => setSubject(subject.name)}  className='hidden peer' id={`${subject.name} ${index}`}/>
                            <label htmlFor={`${subject.name} ${index}`} className="px-px h-32 border-black/5 border rounded-md  flex flex-col items-center peer-checked:border-sky-500 justify-center gap-2 font-dm bg-neutral-50 hover:border-sky-300/35 cursor-pointer transition duration-200 peer-checked:text-sky-500">
                                <span className="">
                                    {subject.icon}
                                </span>
                                <span className="">
                                    {subject.name}
                                </span>

                                </label>

                                    </li>
                        ))
                    }
                </ul>
                <div className="flex gap-2 justify-between items-center" >
               <button disabled={true} className="disabled:text-neutral-300">
                        Precedent
               </button>
               <button className="cursor-pointer " onClick={() =>setStep(2)}>
                    Suivant
                </button>
            </div>

                    </div>
  )
}

export default StepOne


{/* <form action="">
                    <label htmlFor="pdf">
                    <input type="radio" name="type" id="pdf" />
                    <span></span>
                    </label>
                </form> */}
