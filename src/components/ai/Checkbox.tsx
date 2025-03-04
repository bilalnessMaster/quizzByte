import { useState } from "react";

import { motion } from "framer-motion";
import { Answer, QuestionProps } from "@/types/types";
import { useQcmStore } from "@/store/useQcm";
import { toast } from "sonner";
import { cn } from "@/lib/utils";


const CheckboxCard = ({
  question,
  type,
  answers,
  updateScore,
}: QuestionProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string[]>([]);
  const rightQuestions = answers?.filter(item=>item.right)?.length
  const ScorePerAnswer =  rightQuestions ? 1 / rightQuestions : 0;
  const {SetSelectedAnswerCheckBox} = useQcmStore()
  const handleAnswer = (
    e: React.ChangeEvent<HTMLInputElement>,
    ans: Answer
  ) => {
    const isRight = ans.right;
    const  { value, checked } = e.target;

    if (checked) {
      SetSelectedAnswerCheckBox(question , {answer : value , right : isRight})
      setSelectedAnswer((presState) => [...presState, value.toLowerCase()]);
      if (isRight) {
        updateScore(+ScorePerAnswer);
      }
      } else {
        SetSelectedAnswerCheckBox(question , {answer : value , right : isRight})
      const filter = selectedAnswer.filter(
        (answer: string) => answer.toLowerCase() !== value.toLowerCase()
      );
      setSelectedAnswer(filter);
      if (isRight) {
        updateScore(-ScorePerAnswer);
      }
    }
  };
  const handleDisable = () => {
    toast.error(`You can only choose ${rightQuestions} answers.`);
  }
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 200,
      }}
      animate={{
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.4,
          ease: [, 0.8, 0.99, 0.45],
          type: "spring",
        },
      }}
      exit={{
        opacity: 0,
        y: -200,
      }}
      className="w-full max-w-lg bg-white shader px-4 py-4 rounded-lg space-y-5 dark:bg-neutral-800 dark:border border-neutral-700 "
    >
      <div>
        <h1 className="font-dm  font-medium text-xl">{question}</h1>
      </div>
      <div>
        <ul className="space-y-2">
          {answers.map(({ answer, right }, index) => {
            const isDisabled = selectedAnswer.length === rightQuestions && !selectedAnswer.includes(answer.toLowerCase())
            return (
              <li key={index}  className={cn("flex gap-3 items-center cursor-pointer",{
             "opacity-50 cursor-not-allowed" : isDisabled
            })}  onClick={()=>{
                if(isDisabled){
                  handleDisable()
                }
              }} >
              <input
                onChange={(e) => {handleAnswer(e, { answer, right })}}
                type={type}
                name={question}
                value={answer}
                disabled={isDisabled}
                id={question + index}
                className={cn("checkbox",{ "pointer-events-none" : isDisabled })}
                aria-label={`Answer ${index + 1}`}
              />
              <span className=" font-dm font-normal text-lg">
                {answer}
              </span>
            </li>
            )
          })}
        </ul>
      </div>
    </motion.div>
  );
};

export default CheckboxCard;

// const selectedAnswer = [
// {
//  question : the capital of french ,
//  answer : ['selected answers']
// }
//]
