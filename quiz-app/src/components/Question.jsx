function Question({ question, onAnswerClick, selectedAnswer }) {
  return (
    <div className="question">
      {/*question */}
      <h2>{question.question}</h2>
      {/*question options */}
      <ul className="options" role="listbox" aria-label="Answer Choices">
        {question.answerOptions.map((option) => {
          return (
            <li
              key={option.text}
              role="option"
              aria-selected={selectedAnswer?.text === option.text}
            >
              <button
                onClick={() => onAnswerClick(option)}
                aria-pressed={selectedAnswer?.text === option.text}
                className={
                  selectedAnswer?.text === option.text ? "selected" : ""
                }
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
