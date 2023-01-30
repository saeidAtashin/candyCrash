import axios from "axios";
import { useEffect, useState } from "react";

const randomUserNames = [
  "sa",
  "sae",
  "saei",
  "saeid",
  "saeidk",
  "saeidka",
  "saeidkas",
  "saeidkase",
];

const ScoreBoard = ({ score }) => {
  const [gameStates, setGameStates] = useState(null);
  const [userName, setUserName] = useState(null);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:8000/scores");
    const data = Object.keys(response.data.data).map(
      (item) => response.data.data[item]
    );
    setGameStates(data);
  };

  const saveData = async () => {
    const data = {
      username: userName,
      score: score,
    };
    axios
      .post("http://localhost:8000/addscore", data)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err))
      .then(fetchData);
  };

  useEffect(() => {
    fetchData();
    setUserName(
      userName
    );
  }, []);

  const sortScores = gameStates?.sort((a, b) => b.score - a.score);

  return (
    <div className="score-board">
      <h2 className="first__h2">
        {userName} score: {score}
      </h2>

      <h2 className="second__h2">High Scores: </h2>
      <form>
        <label style={{
          display:"flex",
          marginBottom: "10px"
        }}>
          USERNAME: 
          </label>
        <input
          type="text"
          placeholder="Enter Your UserName"
          value={userName}
          onChange= {(e) => setUserName(e.target.value)}
          required
          style={{fontSize: "20px", padding: "10px", outline: "none", backgroundColor: "transparent", color:"white"}}
        />
        <button 
        onClick={saveData}
        style={{fontSize: "20px", padding: "10px", outline: "none", backgroundColor: "#f71ee8", color:"white"}}
        > sava Score</button>
      </form>
      {sortScores?.map((gameState, index) => (
        <div key={index}>
          <h3 className="lastscores">
            {gameState.username} :
          </h3>
          <span> {gameState.score} </span>
        </div>
      ))}
    </div>
  );
};

export default ScoreBoard;
