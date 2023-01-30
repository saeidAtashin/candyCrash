import { useEffect, useState } from "react";
import "./index.css";
import ScoreBoard from "./components/ScoreBoard";
import blueCandy from "./images/blue-candy.png";
import greenCandy from "./images/green-candy.png";
import redCandy from "./images/red-candy.png";
import purpleCandy from "./images/purple-candy.png";
import yellowCandy from "./images/yellow-candy.png";
import orangeCandy from "./images/orange-candy.png";
import blank from "./images/blank.png";
import bg from './images/slanted-gradient.svg'

const width = 8;
const candyColors = [
  blueCandy,
  greenCandy,
  redCandy,
  purpleCandy,
  yellowCandy,
  orangeCandy,
];

const App = () => {
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
  const [candyBeingDragged, setCandyBeingDragged] = useState(null);
  const [candyBeingReplaced, setCandyBeingReplaced] = useState(null);
  const [scoreDisplay, setScoreDisplay] = useState(0);


  const checkForColumnOfFive = () => {
    for (let i = 0; i <= 31; i++) {
      const columnOfFive = [i, i + width, i + width * 2, i + width * 3 , i + width * 4];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === blank;
      if (
        columnOfFive.every(
          (candy) => currentColorArrangement[candy] === decidedColor && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 5);

        columnOfFive.forEach(
          (candy) => (currentColorArrangement[candy] = blank)
        );
        return true;
      }
    }
  };

  const checkForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFoure = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === blank;
      if (
        columnOfFoure.every(
          (candy) => currentColorArrangement[candy] === decidedColor && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 4);

        columnOfFoure.forEach(
          (candy) => (currentColorArrangement[candy] = blank)
        );
        return true;
      }
    }
  };

  const checkForColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === blank;

      if (
        columnOfThree.every(
          (candy) => currentColorArrangement[candy] === decidedColor && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 3);
        columnOfThree.forEach(
          (candy) => (currentColorArrangement[candy] = blank)
        );
        return true;
      }
    }
  };

  const checkForRowOfFive = () => {
    for (let i = 0; i < 64; i++) {
      const RowOfFive = [i, i + 1, i + 2, i + 3, i + 4];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === blank;
      const notValid = [
        4, 5, 6, 7, 12 ,13, 14, 15, 20 , 21, 22, 23,28,  29, 30, 31, 36, 37, 38, 39, 44, 45, 46, 47,52 , 53,
        54, 55,61 , 62, 63, 64,
      ];

      if (notValid.includes(i)) continue;
      if (
        RowOfFive.every(
          (candy) => currentColorArrangement[candy] === decidedColor && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 5);
        RowOfFive.forEach((candy) => (currentColorArrangement[candy] = blank));
        return true;
      }
    }
  };

  const checkForRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      const RowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === blank;
      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55, 62, 63, 64,
      ];

      if (notValid.includes(i)) continue;
      if (
        RowOfFour.every(
          (candy) => currentColorArrangement[candy] === decidedColor && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 4);
        RowOfFour.forEach((candy) => (currentColorArrangement[candy] = blank));
        return true;
      }
    }
  };

  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const RowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === blank;
      const notValid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
      ];

      if (notValid.includes(i)) continue;
      if (
        RowOfThree.every(
          (candy) => currentColorArrangement[candy] === decidedColor && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 3);
        RowOfThree.forEach((candy) => (currentColorArrangement[candy] = blank));
        return true;
      }
    }
  };

  const moveIntoSquareBelow = () => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);

      if (isFirstRow && currentColorArrangement[i] === blank) {
        let randomNumber = Math.floor(Math.random() * candyColors.length);
        currentColorArrangement[i] = candyColors[randomNumber];
      }

      if (currentColorArrangement[i + width] === blank) {
        currentColorArrangement[i + width] = currentColorArrangement[i];
        currentColorArrangement[i] = blank;
      }
    }
  };

  const dragStart = (e) => {
    setCandyBeingDragged(e.target);
  };

  const dragDrop = (e) => {
    setCandyBeingReplaced(e.target);
  };

  const dragEnd = (e) => {
    const candyBeingDraggedId = parseInt(
      candyBeingDragged.getAttribute("data-id")
    );
    const candyBeingReplacedId = parseInt(
      candyBeingReplaced.getAttribute("data-id")
    );

    currentColorArrangement[candyBeingReplacedId] =
      candyBeingDragged.getAttribute("src");
    currentColorArrangement[candyBeingDraggedId] =
      candyBeingReplaced.getAttribute("src");

    const validMoves = [
      candyBeingDraggedId - 1,
      candyBeingDraggedId - width,
      candyBeingDraggedId + 1,
      candyBeingDraggedId + width,
    ];

    const validMove = validMoves.includes(candyBeingReplacedId);
    const isColumnOfFive = checkForColumnOfFive()
    const isRowOfFive= checkForRowOfFive();
    const isColumnOfFour = checkForColumnOfFour();
    const isColumnOfThree = checkForColumnOfThree();
    const isRowOfFour = checkForRowOfFour();
    const isRowOfThree = checkForRowOfThree();

    if (
      candyBeingReplacedId &&
      validMove &&
      (isRowOfFive || isColumnOfFive || isColumnOfFour || isColumnOfThree || isRowOfFour || isRowOfThree)
    ) {
      setCandyBeingDragged(null);
      setCandyBeingReplaced(null);
    } else {
      currentColorArrangement[candyBeingReplacedId] =
        candyBeingReplaced.getAttribute("src");
      currentColorArrangement[candyBeingDraggedId] =
        candyBeingDragged.getAttribute("src");
      setCurrentColorArrangement([...currentColorArrangement]);
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
      checkForColumnOfFive();
      checkForRowOfFive();
      checkForColumnOfFour();
      checkForRowOfFour();
      checkForColumnOfThree();
      checkForRowOfThree();
      moveIntoSquareBelow();
      setCurrentColorArrangement([...currentColorArrangement]);
    }, 100);
    return () => clearInterval(timer);
  }, [
    checkForColumnOfFive,
    checkForRowOfFive,
    checkForColumnOfFour,
    checkForRowOfFour,
    checkForRowOfThree,
    checkForColumnOfThree,
    moveIntoSquareBelow,
    currentColorArrangement,
  ]);

  return (
    <div
    className="app"
    style={{
      backgroundImage : `url(${bg})`,
      backgroundRepeat:"no-repeat",
      backgroundPosition: "center",
      backgroundSize: "cover",
      minHeight: "100vh"
      }}>
      <div className="game">
        {currentColorArrangement.map((candyColors, index) => (
          <img
            key={index}
            src={candyColors}
            alt={candyColors}
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          />
        ))}
      </div>
      <ScoreBoard score={scoreDisplay} />
    </div>
  );
};
export default App;
