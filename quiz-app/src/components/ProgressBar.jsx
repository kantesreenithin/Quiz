import React from "react";

function ProgressBar({ currentQuestion, questions }) {
  return (
    <div className="progress-bar">
      <div
        className="progress"
        role="progressbar"
        aria-label="Quiz Progress"
        style={{
          width: `${((currentQuestion + 1) / questions.length) * 100}%`,
        }}
      ></div>
    </div>
  );
}

export default ProgressBar;
