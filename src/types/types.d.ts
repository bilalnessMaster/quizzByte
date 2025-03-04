import { StaticImageData } from "next/image"
declare module "next-auth" {

    interface User {
    id?:number | null ,
    firstName?: string ,
    lastName?:string ,
    email?: string | null,
    isAdmin?: boolean ,
    password?:string
    firstTime ?: boolean,
    }

    interface Session {
        id?:number,
        firstName?: string ,
        lastName?:string  ,
        email?: string| null ,
        isAdmin?: boolean  ,
        firstTime ?: boolean,
        password?:string

    }
  }


  import type  { JWT } from "next-auth/jwt"

  declare module "next-auth/jwt" {

    interface JWT {
        id?:number | null ,
        firstName?: string ,
        lastName?:string ,
        email?: string | null,
        isAdmin?: boolean ,
        password?:string
        firstTime ?: boolean,
        idToken?: string
    }
  }


export interface UserProps {
    id?:number,
    firstName?: string ,
    lastName?:string ,
    email?: string ,
    isAdmin?: boolean ,
    firstTime ?: boolean,
    password?:string
}

export  interface genderProp{
    gender : 'female' | 'male' ,
    img : StaticImageData
}

export interface State{
    errors?: {
        email?: string[];
        password?: string[];
        firstName ? : string[]
        lastName ? : string[]
      };
    message?: string
}

export interface Answer {
    answer: string;
    right: boolean;
  }

  export interface Qcm {
    type: "radio" | "checkbox";
    category: string;
    question: string;
    answers: Answer[];
    language: string;
    level: string;
    tags: string[];
  }

  export interface SelectedQcm {
    category: string;
    question: string;
    rightAnswers: Answer[];
    answers: Answer[];
  }

  export interface QcmStore {
    QcmsData: Qcm[];
    start: boolean;
    completed: boolean;
    currentIndex: number;
    time: number;
    SelectedAnswers: SelectedQcm[];
    score: number;
    attemptSaved: boolean;
    setAttemptSaved: (value: boolean) => void;
    updateScore: (value: number) => void;
    setStart: (value: boolean) => void;
    SetSelectedAnswerCheckBox: (question: string, answer: Answer) => void;
    SetSelectedAnswerRadio: (question: string, value: Answer) => void;
    setCurrentIndex: (index: number) => void;
    handleNextQuestion: () => void;
    handlePreviousQuestion: () => void;
    setQcmData: (dataQcm: Qcm[]) => void;
    ResetQcmDetails: () => void;
  }

  export interface QuestionProps{
    question : string,
    type : 'radio' | 'checkbox',
    answers : Answer[],
     updateScore : (value : number) => void,
  }
