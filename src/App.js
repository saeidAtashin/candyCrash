import { useEffect, useState } from "react";
import "./index.css";
const width = 8;
const candyColors = ["blue", "green", "orange", "red", "purple", "yellow"];

const App = () => {
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);


  const checkForColumnOfFour = () => {
    for (let i = 0; i < 39; i++) {
      const columnOfFoure = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currentColorArrangement[i];

      if (
        columnOfFoure.every(
          (candy) => currentColorArrangement[candy] === decidedColor
        )
      ) {
        columnOfFoure.forEach((candy) => (currentColorArrangement[candy] = ""));
      }
    }
  };


  const checkForColumnOfThree = () => {
    for (let i = 0; i < 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = currentColorArrangement[i];

      if (
        columnOfThree.every(
          (candy) => currentColorArrangement[candy] === decidedColor
        )
      ) {
        columnOfThree.forEach((candy) => (currentColorArrangement[candy] = ""));
      }
    }
  };

  

  const checkForRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      const RowOfFour = [i, i + 1, i + 2 , i + 3];
      const decidedColor = currentColorArrangement[i];
      const notValid = [5, 6, 7,13 , 14, 15, 21, 22, 23,29 , 30, 31, 37 , 38, 39, 45, 46,47, 53 , 54, 55, 62, 63, 64]

  if (notValid.includes(i)) continue
      if (
        RowOfFour.every(
          (candy) => currentColorArrangement[candy] === decidedColor
        )
      ) {
        RowOfFour.forEach((candy) => (currentColorArrangement[candy] = ""));
      }
    }
  };

  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const RowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentColorArrangement[i];
      const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55,63,64]

  if (notValid.includes(i)) continue
      if (
        RowOfThree.every(
          (candy) => currentColorArrangement[candy] === decidedColor
        )
      ) {
        RowOfThree.forEach((candy) => (currentColorArrangement[candy] = ""));
      }
    }
  };


  const createBoard = () => {
    const randomColorArrangement = [];
    for (let i = 0; i < width * width; i++) {
      const randomColor =
        candyColors[Math.floor(Math.random() * candyColors.length)];
      randomColorArrangement.push(randomColor);
    }
    setCurrentColorArrangement(randomColorArrangement);
  };

  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour()
      checkForRowOfFour()
      checkForColumnOfThree()
      checkForRowOfThree()
      setCurrentColorArrangement([...currentColorArrangement])
    }, 1000)
    return () => clearInterval(timer);
  }, [ checkForColumnOfFour, checkForRowOfFour, currentColorArrangement, checkForRowOfThree ,checkForColumnOfThree])

  console.log(currentColorArrangement);




  return (
    <div className="app">
      <div className="game">
        {currentColorArrangement.map((candyColors, index) => (
          <img
            key={index}
            style={{ backgroundColor: candyColors }}
            alt={candyColors}
          />
        ))}
      </div>
    </div>
  );
};
export default App;
