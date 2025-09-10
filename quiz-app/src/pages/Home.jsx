import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Home() {
  const navigate = useNavigate();
  const [showInstructions, setShowInstructions] = useState(false);

  const instructions = [
    "The quiz contains multiple-choice questions.",
    "You will have 30 seconds to answer each question.",
    "Use the Next and Prev buttons to navigate between questions.",
    "Once the timer runs out, you’ll automatically move to the next question.",
    "If previous question time ends you cannot go back to previous question.",
    "You can change your answer before the timer ends for that question.",
    "Click Submit after the last question to see your results.",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-tr from-teal-50 via-white to-emerald-50 flex items-center px-6 py-12">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Hero Section */}
        <div className="space-y-8 text-center lg:text-left">
          <h1 className="font-poppins text-4xl sm:text-5xl lg:text-6xl font-extrabold text-teal-700 leading-tight drop-shadow-sm">
            Welcome to the <span className="text-emerald-600">Quiz App 🎉</span>
          </h1>
          <p className="font-lato text-lg sm:text-xl text-gray-700 max-w-xl mx-auto lg:mx-0">
            Challenge yourself, learn new things, and test your brainpower with
            engaging multiple-choice quizzes.
          </p>

          {/* Start Button */}
          <div className="flex justify-center lg:justify-start">
            <button
              onClick={() => navigate("/quiz")}
              className="px-10 py-4 font-poppins text-lg font-semibold rounded-2xl shadow-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white hover:from-teal-700 hover:to-emerald-700 transform hover:scale-105 transition-all"
            >
              🚀 Start Quiz
            </button>
          </div>
        </div>

        {/* Right Side: Cards + Illustration */}
        <div className="space-y-8">
          {/* Preview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl hover:-translate-y-1 transition">
              <h3 className="font-poppins text-lg font-semibold text-teal-700">
                ⏳ 30s per Question
              </h3>
              <p className="font-lato text-gray-600 mt-2 text-sm">
                Stay sharp with countdown timers.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl hover:-translate-y-1 transition">
              <h3 className="font-poppins text-lg font-semibold text-emerald-700">
                📝 Multiple Choice
              </h3>
              <p className="font-lato text-gray-600 mt-2 text-sm">
                Pick the best option from curated answers.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl hover:-translate-y-1 transition">
              <h3 className="font-poppins text-lg font-semibold text-yellow-700">
                📊 Score & Review
              </h3>
              <p className="font-lato text-gray-600 mt-2 text-sm">
                Get instant results & feedback.
              </p>
            </div>
          </div>

          {/* Collapsible Instructions */}
          <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-8">
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="w-full flex items-center justify-between font-poppins text-xl sm:text-2xl font-bold text-gray-800 focus:outline-none"
            >
              <p className="font-poppins text-lg font-semibold text-emerald-700">
                📝 Instructions
              </p>
              <span className="text-teal-600 text-2xl">
                {showInstructions ? "−" : "+"}
              </span>
            </button>

            <div
              className={`grid transition-all duration-500 ease-in-out ${
                showInstructions
                  ? "grid-rows-[1fr] opacity-100 mt-6"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <ul className="overflow-hidden space-y-3 text-gray-700 font-lato">
                {instructions.map((item, index) => (
                  <li
                    key={index}
                    className="bg-teal-50 border border-teal-100 rounded-xl px-4 py-3 hover:bg-teal-100 transition"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
