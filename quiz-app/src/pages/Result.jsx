import { useNavigate } from "react-router-dom";
import { useQuiz } from "../contexts/QuizContext";
import { useEffect, useState } from "react";

function Result() {
  const navigate = useNavigate();
  const { userAnswers, questions, resetQuiz } = useQuiz();

  const correctAnswers = userAnswers.filter((ans) => ans?.isCorrect).length;
  const scorePercent = Math.round((correctAnswers / questions.length) * 100);

  const [highestScore, setHighestScore] = useState(0);

  // Single useEffect to handle reading and updating highest score
  useEffect(() => {
    const savedScore = Number(localStorage.getItem("highestScore") || 0);
    if (correctAnswers > savedScore) {
      localStorage.setItem("highestScore", correctAnswers);
      setHighestScore(correctAnswers);
    } else {
      setHighestScore(savedScore);
    }
  }, [correctAnswers]);

  const handleRestartQuiz = () => {
    resetQuiz();
    navigate("/quiz");
  };

  const handleGoHome = () => {
    resetQuiz();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-teal-50 via-white to-emerald-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Top Score Section */}
        <div className="bg-gradient-to-br from-teal-600 to-emerald-600 rounded-3xl shadow-xl p-8 sm:p-12 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">🎉 Quiz Completed!</h2>

          {/* Dynamic Message */}
          <p className="text-base sm:text-lg opacity-90 mb-10">
            {scorePercent === 100
              ? "🏆 Perfect score! Outstanding performance!"
              : scorePercent >= 80
              ? "🌟 Excellent work! You really know your stuff."
              : scorePercent >= 60
              ? "👍 Good job! A little more practice and you'll nail it."
              : scorePercent >= 40
              ? "🙂 Not bad, but there’s room to improve."
              : "💡 Keep practicing! You’ll get better with time."}
          </p>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <p className="text-sm opacity-80">Your Score</p>
              <p className="text-2xl sm:text-3xl font-bold">{correctAnswers} / {questions.length}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <p className="text-sm opacity-80">Percentage</p>
              <p className="text-2xl sm:text-3xl font-bold">{scorePercent}%</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <p className="text-sm opacity-80">Highest Score</p>
              <p className="text-2xl sm:text-3xl font-bold text-yellow-300">
                {highestScore} / {questions.length}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button
              onClick={handleRestartQuiz}
              className="px-6 py-3 rounded-2xl bg-white text-teal-700 font-semibold shadow-lg hover:bg-gray-100 transition text-sm sm:text-base"
            >
              🔄 Restart Quiz
            </button>
            <button
              onClick={handleGoHome}
              className="px-6 py-3 rounded-2xl bg-white/20 text-white font-semibold shadow-lg hover:bg-white/30 transition text-sm sm:text-base"
            >
              🏠 Home
            </button>
          </div>
        </div>

        {/* Answer Review Section */}
        <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-10">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">📊 Review Your Answers</h3>
          <ul className="space-y-6">
            {questions.map((q, i) => {
              const correctAnswer = q.answerOptions.find((opt) => opt.isCorrect);
              const userAnswer = userAnswers[i];
              const isCorrect = userAnswer?.isCorrect;

              return (
                <li
                  key={i}
                  className={`rounded-2xl border p-5 sm:p-6 transition ${
                    isCorrect ? "bg-emerald-50 border-emerald-200" : "bg-rose-50 border-rose-200"
                  }`}
                >
                  <p className="font-semibold text-gray-900 mb-2">
                    Q{i + 1}: {q.question}
                  </p>
                  <p className="text-sm mb-1">
                    Your Answer:{" "}
                    <span className={`font-medium ${isCorrect ? "text-emerald-600" : "text-rose-600"}`}>
                      {isCorrect ? "✔️ " : "❌ "}
                      {userAnswer ? userAnswer.text : "Not answered"}
                    </span>
                  </p>
                  <p className="text-sm text-gray-700">
                    Correct Answer:{" "}
                    <span className="font-medium text-teal-600">{correctAnswer.text}</span>
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Result;
