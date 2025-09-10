import React from "react";

function ProgressBar({ currentQuestion, questions }) {
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
      <div
        className="h-4 bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}

export default ProgressBar;
