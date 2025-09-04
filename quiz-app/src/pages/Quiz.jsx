import { useEffect} from "react";
import Question from "../components/Question";
import ProgressBar from "../components/ProgressBar";
import { useQuiz } from "../contexts/QuizContext";
import { useNavigate } from "react-router-dom";
function Quiz() {
  //Getting all needed items form context
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

  //sepcific timer per question
  const timeLeft = timers[currentQuestion];

  //set timer per question if go to prev then the timer should resume for prevosuly stopped and count down
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

  // when time becomes zero automatically move to next or if last question then submit
  useEffect(() => {
    if (timeLeft === 0) {
      handleAutoNext();
    }
  }, [timeLeft]);

  //auto handle for next question
  const handleAutoNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      navigate("/result");
    }
  };

  //get user answers and store it at specific question num index
  const handleAnswer = (answer) => {
    const updatedAnswers = [...userAnswers];
    // updatedAnswers[currentQuestion] = answer;
    if (updatedAnswers[currentQuestion]?.text === answer.text) {
      updatedAnswers[currentQuestion] = null; //retracts it clicked again
    } else {
      updatedAnswers[currentQuestion] = answer;
    }
    setUserAnswers(updatedAnswers);
  };

  //navigate to prev question
  const navigateToPrevQuestion = () => {
    setCurrentQuestion((prev) => prev - 1);
  };

  //navigate to next question
  const navigateToNextQuestion = () => {
    setCurrentQuestion((prev) => prev + 1);
  };

  //navigate to result
  const handleResult = () => {
    navigate("/result");
  };
  return (
    <div className="app">
     <h1 class="clean-heading">Test Your Brainpower : The Ultimate GK Quiz!</h1>



      {
        <div>
          {/*question number and timer */}
          <div className="question-timer">
            <p>
              Question {currentQuestion + 1} of {questions.length}
            </p>
            <p className="timer">
              🕔 :{" "}
              <span className={timeLeft < 6 ? "alert-timer" : ""}>
                {timeLeft}
              </span>
            </p>
          </div>

          {/*progress bar Component*/}
          <ProgressBar
            currentQuestion={currentQuestion}
            questions={questions}
          />

          {/*Question Component */}
          <Question
            question={questions[currentQuestion]}
            onAnswerClick={handleAnswer}
            selectedAnswer={userAnswers[currentQuestion]}
          />

          {/*Navigation btns */}
          <div className="nav-buttons">
            {currentQuestion > 0 && (
              <button onClick={navigateToPrevQuestion}
              disabled={
                currentQuestion===0 || timers[currentQuestion-1]===0
              }
              >Prev</button>
            )}

            {currentQuestion < questions.length - 1 && (
              <button
                onClick={navigateToNextQuestion}
                disabled={userAnswers[currentQuestion]}
              >
                Skip
              </button>
            )}

            {currentQuestion < questions.length - 1 && (
              <button
                onClick={navigateToNextQuestion}
                disabled={!userAnswers[currentQuestion]}
              >
                Next
              </button>
            )}

            {/*submit btn on last question */}
            {currentQuestion === questions.length - 1 && (
              <button
                onClick={handleResult}
                style={{ background: "#007bff", color: "white" }}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      }
    </div>
  );
}

export default Quiz;
