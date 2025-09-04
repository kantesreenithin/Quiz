function Question({ question, onAnswerClick, selectedAnswer }) {
  return (
    <div className="question">
      {/*question */}
      <h2>{question.question}</h2>
      {/*question options */}
      <ul className="options">
        {question.answerOptions.map((option) => {
          return (
            <li key={option.text}>
              <button
                onClick={() => onAnswerClick(option)}
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
