function Question({ question, onAnswerClick, selectedAnswer }) {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-10 space-y-6">
      {/* Question */}
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center">
        {question.question}
      </h2>

      {/* Options */}
      <ul
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        role="listbox"
        aria-label="Answer Choices"
      >
        {question.answerOptions.map((option) => {
          const isSelected = selectedAnswer?.text === option.text;

          return (
            <li key={option.text} role="option" aria-selected={isSelected}>
              <button
                onClick={() => onAnswerClick(option)}
                aria-pressed={isSelected}
                className={`font-poppins w-full flex items-center justify-center px-8 py-5 rounded font-semibold text-lg transition-all duration-300
                  ${
                    isSelected
                      ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-xl scale-105"
                      : "bg-gray-50 text-gray-800 hover:bg-gradient-to-r hover:from-teal-100 hover:to-emerald-100 shadow-md"
                  }`}
              >
                {option.text}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Question;
