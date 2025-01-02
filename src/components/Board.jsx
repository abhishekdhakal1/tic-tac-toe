import { useState } from "react";
import Square from "./Square";
import "./index.css";

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [isXturn, setIsXturn] = useState(true);
  const array = [...squares];
  let status;

  function handleClick(getValue) {
    if (squares[getValue] || winner) {
      return;
    }
    array[getValue] = isXturn ? "X" : "O";
    setSquares(array);
    setIsXturn(!isXturn);
  }

  function calcWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  const winner = calcWinner(squares);

  if (winner) {
    status = "Winner " + winner;
  } else if (!winner && squares.every((item) => item !== "")) {
    status = "It's a Draw. Restart the game.";
  } else {
    status = "Next Player: " + (isXturn ? "X" : "O");
  }

  return (
    <div className="container">
      <h1>{status}</h1>
      {[0, 1, 2].map((row) => (
        <div className="row-container" key={row}>
          {[0, 1, 2].map((col) => {
            const index = row * 3 + col;
            return (
              <Square
                key={index}
                value={squares[index]}
                onHandleClick={() => handleClick(index)}
              />
            );
          })}
        </div>
      ))}
      <button
        className="reset-btn"
        onClick={() => {
          setSquares(Array(9).fill(""));
          setIsXturn(true);
        }}
      >
        Reset
      </button>
    </div>
  );
}
