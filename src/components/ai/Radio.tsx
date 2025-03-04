'use client'
import { useState } from "react";
import { motion } from "framer-motion";
import { QuestionProps } from "@/types/types";
import { useQcmStore } from "@/store/useQcm";


const AiRadioCard = ({ question, type, answers, updateScore }: QuestionProps) => {
  const [seletedAnswer, setSeletedAnswer] = useState<string>("");
  const {SetSelectedAnswerRadio}= useQcmStore()
  const handleAnswer = (
    e: React.ChangeEvent<HTMLInputElement>,
    ans: { answer: string; right: boolean }
  ) => {
    const isRight = ans.right;
    const { value, checked } = e.target;


      if (checked) {
        const prevRightAnswer = answers.find(
          (answerObj) => answerObj.answer === seletedAnswer
        )?.right;

        if (prevRightAnswer) {
          updateScore(-1);
        }
        setSeletedAnswer(value);
        SetSelectedAnswerRadio(question , {answer : value , right : isRight})
        if (isRight) {
          updateScore(+1);
        }
      }

  };
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
      className="w-full max-w-lg bg-neutral-50 shader px-4 py-4 rounded-lg space-y-5 dark:bg-neutral-800 border    "
    >
      <div>
        <h1 className="font-dm  font-medium text-xl">{question}</h1>
      </div>
      <div>
        <ul className="space-y-2">
          {answers.map(({ answer, right }, index) => (
            <li key={index} className="flex   gap-3 items-baseline  ">
              <input
                onChange={(e) => handleAnswer(e, { answer, right })}
                type={type}
                name={question}
                value={answer}
                id={question + index}
                className="radio"
              />
              <span className="font-dm font-normal  text-lg text-balance ">
                <span>
                {answer}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default AiRadioCard;

// const selectedAnswer = [
// {
//  question : the capital of french ,
//  answer : ['selected answers']
// }
//]
