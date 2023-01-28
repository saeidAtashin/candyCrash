import { useEffect, useState } from "react";
import './index.css'
const width = 8;
const candyColors = ["blue", "green", "orange", "red", "purple", "yellow"];



const App = () => {

  const [currentColorArrangement, setCurrentColorArrangement] = useState([])


  const createBoard = () => {
    const randomColorArrangement = []
    for (let i = 0; i < width * width; i++) {
      const randomColor =
        candyColors[Math.floor(Math.random() * candyColors.length)];
        randomColorArrangement.push(randomColor)
    }
    setCurrentColorArrangement(randomColorArrangement)
  };
  
  useEffect(() => {
    createBoard()
  }, [])

console.log(currentColorArrangement)

  return (
  <div className="app">
    <div className="game">
      {currentColorArrangement.map((candyColors , index) => (
        <img
        key={index}
        style={{backgroundColor:candyColors}}
        />
      ))}
    </div>

  </div>

)
      }
export default App;
