import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="home">
      <h1>Welcome to quiz app</h1>
      <p>Test you General Knowledge and verify with results</p>
      {/*button to navigate to quiz page */}
      <button onClick={() => navigate("/quiz")}>Start Quiz</button>
    </div>
  );
}

export default Home;
