import { create } from "zustand";
import { Answer, Qcm, QcmStore, SelectedQcm } from "@/types/types";

export const useQcmStore = create<QcmStore>((set, get) => ({
  QcmsData: [],
  start: false,
  completed: false,
  currentIndex: 0,
  time: 0,
  SelectedAnswers: [],
  score: 0,
  attemptSaved: false,

  setAttemptSaved: (value: boolean) => set({ attemptSaved: value }),

  updateScore: (value: number) => {
    const { score } = get();
    set({ score: score + value });
  },

  setStart: (value: boolean) => set({ start: value }),

  SetSelectedAnswerCheckBox: (question: string, answer: Answer) => {
    console.log(answer);
    
    const { SelectedAnswers } = get();
    const updatedAnswers = SelectedAnswers.map((qcm) => {
      if (qcm.question.toLowerCase() === question.toLowerCase()) {
        const isAlreadySelected = qcm.answers.find((ans) => ans.answer === answer.answer);
        return {
          ...qcm,
          answers: isAlreadySelected
            ? qcm.answers.filter((ans) => ans.answer !== answer.answer)
            : [...qcm.answers, answer],
        };
      }
      return qcm;
    });
    set({ SelectedAnswers: updatedAnswers });
  },

  SetSelectedAnswerRadio: (question: string, value: Answer) => {
    const { SelectedAnswers } = get();
    const updatedAnswers = SelectedAnswers.map((qcm) => {
      if (qcm.question.toLowerCase() === question.toLowerCase()) {
        return { ...qcm, answers: [value] };
      }
      return qcm;
    });
    set({ SelectedAnswers: updatedAnswers });
  },

  setCurrentIndex: (index: number) => set({ currentIndex: index }),

  handleNextQuestion: () => {
    const { currentIndex, QcmsData } = get();
    if (currentIndex < QcmsData.length - 1) {
      set({ currentIndex: currentIndex + 1 });
    } else {
      set({ completed: true });
    }
  },

  handlePreviousQuestion: () => {
    const { currentIndex } = get();
    if (currentIndex > 0) {
      set({ currentIndex: currentIndex - 1 });
    }
  },

  setQcmData: (dataQcm: Qcm[]) => {
    const arrayAnswer: SelectedQcm[] = dataQcm.map((qcm) => ({
      category: qcm.category,
      question: qcm.question,
      rightAnswers: qcm.answers.filter((answer) => answer.right),
      answers: [],
    }));

    set({ QcmsData: dataQcm, SelectedAnswers: arrayAnswer });
  },

  ResetQcmDetails: () => {
    set({
      QcmsData: [],
      start: false,
      completed: false,
      currentIndex: 0,
      time: 0,
      SelectedAnswers: [],
      score: 0,
      attemptSaved: false,
    });
  },
}));
