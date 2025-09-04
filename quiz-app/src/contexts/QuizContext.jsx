import { createContext, useContext, useEffect, useState } from "react";
import questionData from "../constants/questions.json";

//creates context
const QuizContext = createContext();

export const useQuiz = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
  //created function for persistance for useranswers currentquestion and timers
  const loadState = () => {
    const saved = localStorage.getItem("quizState");
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        userAnswers:
          parsed.userAnswers || Array(questionData.length).fill(null),
        currentQuestion: parsed.currentQuestion || 0,
        timers: parsed.timers || Array(questionData.length).fill(30),
      };
    }
    return {
      userAnswers: Array(questionData.length).fill(null),
      currentQuestion: 0,
      timers: Array(questionData.length).fill(30),
    };
  };

  const initial = loadState();

  //initialize the state with return values from localstorage
  const [userAnswers, setUserAnswers] = useState(initial.userAnswers);
  const [questions] = useState(questionData);
  const [currentQuestion, setCurrentQuestion] = useState(
    initial.currentQuestion
  );
  const [timers, setTimers] = useState(initial.timers);

  //setItems when the user answers, question changes, time change
  useEffect(() => {
    localStorage.setItem(
      "quizState",
      JSON.stringify({
        userAnswers,
        currentQuestion,
        timers,
      })
    );
  }, [userAnswers, currentQuestion, timers]);

  //restart the quiz
  //go to first question set every state to empty and remove from localstorage
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers(Array(questionData.length).fill(null));
    setTimers(Array(questionData.length).fill(30));
    localStorage.removeItem("quizState");
  };

  return (
    <QuizContext.Provider
      value={{
        userAnswers,
        setUserAnswers,
        questions,
        currentQuestion,
        setCurrentQuestion,
        timers,
        setTimers,
        resetQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
