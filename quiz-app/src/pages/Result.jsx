import { useNavigate } from "react-router-dom";
import { useQuiz } from "../contexts/QuizContext";
import { useEffect, useState } from "react";

function Result() {
  const navigate = useNavigate();
  const { userAnswers, questions, resetQuiz } = useQuiz();

  //filter anwers with correct answer and find length
  const correctAnswers = userAnswers.filter(
    (ans) => ans?.isCorrect === true
  ).length;

  const [highestScore, setHighestScore] = useState(0);

  // Get highest Score from localStorage
  useEffect(() => {
    const savedScore = localStorage.getItem("highestScore");
    if (savedScore) {
      setHighestScore(Number(savedScore));
    }
  }, []);

  //Store highest Score in localStorage when score greater than prev HighScore
  useEffect(() => {
    if (correctAnswers > highestScore) {
      localStorage.setItem("highestScore", correctAnswers);
      setHighestScore(correctAnswers);
    }
  }, [correctAnswers, highestScore]);

  //if reset go q1 ad start the quiz
  const handleResult = () => {
    resetQuiz();
    navigate("/quiz");
  };

  //navigate to home
  const handleGoHome = () => {
    resetQuiz();
    navigate("/");
  };

  return (
    <div className="results">
      {/* score summary */}
      <h2 className="results-title">Results</h2>
      <div className="score-box">
        <p>
          You answered <span className="score-highlight">{correctAnswers}</span>{" "}
          / {questions.length} correctly
        </p>
        <p>
          Highest Score : <span className="score-highlight">{highestScore}</span>
          /{questions.length}
        </p>
      </div>
      {/*btns for restart and home */}
      <button onClick={handleResult}>Restart Quiz</button>

      <button onClick={handleGoHome}>Home</button>

      <h2>Result Summary</h2>
      {/*map thorugh question find crt answers and the useranswers show them in li */}
      <ul>
        {questions.map((q, i) => {
          {
            /*map thorugh options array find the correct option */
          }
          const correctAnswer = q.answerOptions.find(
            (opt) => opt.isCorrect === true
          );
          {
            /*acces useranswer with index */
          }
          const userAnswer = userAnswers[i];
          const isCorrect = userAnswer?.isCorrect;

          return (
            <li key={i} style={{ marginBottom: "1rem" }}>
              <span style={{ fontWeight: "bold" }}>Q{i + 1}:</span> {q.question}
              <br />
              Your answer:{" "}
              <span style={{ color: userAnswer?.isCorrect ? "green" : "red" }}>
                <span style={{ fontSize: "12px" }}>
                  {isCorrect ? "✔️" : "❌"}
                </span>{" "}
                {userAnswer ? userAnswer.text : "Not answered"}
              </span>
              <br />
              Correct answer: <span>{correctAnswer.text}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Result;
