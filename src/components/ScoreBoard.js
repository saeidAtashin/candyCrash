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
]

const ScoreBoard = ({ score }) => {

  const [gameStates, setGameStates] = useState(null)
  const [userName, setUserName] = useState(null)

  const fetchData = async () => {
   const response = await axios.get('http://localhost:8000/scores')
   const data = Object.keys(response.data.data).map(item => response.data.data[item])
   setGameStates(data)
  }



  const saveData = async () => {
    axios.post('http://localhost:8000/addscore')
    .then(response => {console.log(response)})
    .catch(err => console.log(err))
  }



  useEffect(() => {
    fetchData()
    setUserName(randomUserNames[Math.floor(Math.random() * randomUserNames.length)])
  }, [])

  const sortScores = gameStates?.sort((a,b) => b.score - a.score)

  return (
    <div className="score-board">
      <h2>{userName} score: {score}</h2>

      <h2>High Scores: </h2>
      {sortScores?.map((gameState, index) => (
        <div key={{index}}>
          <h3>{gameState.username}: {gameState.score}</h3>

        </div>
      ))}
      <button onClick={saveData}> sava Score</button>
    </div>
  );
};

export default ScoreBoard;
