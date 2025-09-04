import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const instructions = [
    "The quiz contains multiple-choice questions.",

    "You will have 30 seconds to answer each question.",

    "Use the Next and Prev buttons to navigate between questions.",

    "Once the timer runs out, you’ll automatically move to the next question.",

    "If previous question time ends you cannot go back to previous question",

    "You can change your answer before the timer ends for that question.",

    "Click Submit after the last question to see your results.",
  ];
  return (
    <div className="home">
      <h1>Welcome to quiz app</h1>
      <p>Test you General Knowledge and verify with results</p>
      {/* Instructions Box */}
      <div className="instructions">
        <h2>📝 Instructions</h2>
        <ul>
          {instructions.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      {/*button to navigate to quiz page */}
      <button onClick={() => navigate("/quiz")}>Start Quiz</button>
    </div>
  );
}

export default Home;
