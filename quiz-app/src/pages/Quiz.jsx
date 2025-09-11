import { useEffect } from "react";
import Question from "../components/Question";
import ProgressBar from "../components/ProgressBar";
import { useQuiz } from "../contexts/QuizContext";
import { useNavigate } from "react-router-dom";

function Quiz() {
  const {
    userAnswers,
    setUserAnswers,
    questions,
    currentQuestion,
    setCurrentQuestion,
    timers,
    setTimers,
  } = useQuiz();

  const navigate = useNavigate();
  const timeLeft = timers[currentQuestion];

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimers((prev) => {
        const updated = [...prev];
        if (updated[currentQuestion] > 0) {
          updated[currentQuestion] = updated[currentQuestion] - 1;
        }
        return updated;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [currentQuestion, setTimers]);

  // Auto move when time = 0
  useEffect(() => {
    if (timeLeft === 0) {
      handleAutoNext();
    }
  }, [timeLeft]);

  const handleAutoNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      navigate("/result");
    }
  };

  const handleAnswer = (answer) => {
    const updatedAnswers = [...userAnswers];
    if (updatedAnswers[currentQuestion]?.text === answer.text) {
      updatedAnswers[currentQuestion] = null;
    } else {
      updatedAnswers[currentQuestion] = answer;
    }
    setUserAnswers(updatedAnswers);
  };

  const navigateToPrevQuestion = () => setCurrentQuestion((prev) => prev - 1);
  const navigateToNextQuestion = () => setCurrentQuestion((prev) => prev + 1);
  const handleResult = () => navigate("/result");

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        if (
          userAnswers[currentQuestion] &&
          currentQuestion < questions.length - 1
        ) {
          navigateToNextQuestion();
        }
      } else if (e.key === "ArrowLeft" && currentQuestion > 0) {
        navigateToPrevQuestion();
      } else if (e.key === "Enter") {
        if (userAnswers[currentQuestion] && currentQuestion === questions.length - 1) {
          handleResult();
        } else if (userAnswers[currentQuestion]) {
          navigateToNextQuestion();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentQuestion, questions, userAnswers]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 py-10 px-6 sm:px-10 flex flex-col items-center">
      {/* Title */}
      <h1 className="font-poppins text-3xl sm:text-4xl font-semibold text-shadow-zinc-700 drop-shadow-md text-center mb-8">
        🧠 Challenge Your Mind: General Knowledge Quiz
      </h1>

      {/* Question Card */}
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-lg p-8 sm:p-10 space-y-6">
        {/* Question Header */}
        <div className="flex justify-between items-center">
          <p className="font-poppins text-gray-700 font-semibold">
            Question {currentQuestion + 1} / {questions.length}
          </p>
          <p
            className={`px-4 py-1 rounded-full font-bold text-sm ${
              timeLeft < 6
                ? "bg-rose-100 text-rose-600 animate-pulse"
                : "bg-teal-100 text-teal-700"
            }`}
            aria-live="polite"
          >
            ⏳ {timeLeft}s
          </p>
        </div>

        {/* Progress bar */}
        <ProgressBar currentQuestion={currentQuestion} questions={questions} />

        {/* Question component */}
        <Question
          currentQuestion={currentQuestion}
          question={questions[currentQuestion]}
          onAnswerClick={handleAnswer}
          selectedAnswer={userAnswers[currentQuestion]}
        />

        {/* Navigation Buttons */}
        <div className="flex flex-wrap justify-center gap-4 pt-6">
          {currentQuestion > 0 && (
            <button
              onClick={navigateToPrevQuestion}
              disabled={timers[currentQuestion - 1] === 0}
              className="px-6 py-3 rounded-xl font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed  transition"
            >
              Prev
            </button>
          )}
          {currentQuestion < questions.length - 1 && (
            <>
              <button
                onClick={navigateToNextQuestion}
                className="px-6 py-3 rounded-xl font-semibold bg-yellow-100 text-yellow-700 hover:bg-yellow-200 disabled:cursor-not-allowed  transition"
              >
                Skip
              </button>
              <button
                onClick={navigateToNextQuestion}
                disabled={!userAnswers[currentQuestion]}
                className="px-6 py-3 rounded-xl font-semibold bg-teal-600 text-white hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed  transition"
              >
                Next
              </button>
            </>
          )}
          {currentQuestion === questions.length - 1 && (
            <button
              onClick={handleResult}
              className="px-8 py-3 rounded-xl font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Quiz;
