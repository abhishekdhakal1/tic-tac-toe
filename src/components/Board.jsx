import { useState } from "react";
import Square from "./Square";
import "./index.css";

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [isXturn, setIsXturn] = useState(true);
  let array = [...squares];
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
    status = "It's Draw. Restart the game again.";
  } else {
    status = "Next Player " + (isXturn ? "X" : "O");
  }

  return (
    <>
      <div className="container">
        <h1>{status}</h1>
        <div className="row-container">
          <Square value={squares[0]} onHandleClick={() => handleClick(0)} />
          <Square value={squares[1]} onHandleClick={() => handleClick(1)} />
          <Square value={squares[2]} onHandleClick={() => handleClick(2)} />
        </div>
        <div className="row-container">
          <Square value={squares[3]} onHandleClick={() => handleClick(3)} />
          <Square value={squares[4]} onHandleClick={() => handleClick(4)} />
          <Square value={squares[5]} onHandleClick={() => handleClick(5)} />
        </div>
        <div className="row-continer">
          <Square value={squares[6]} onHandleClick={() => handleClick(6)} />
          <Square value={squares[7]} onHandleClick={() => handleClick(7)} />
          <Square value={squares[8]} onHandleClick={() => handleClick(8)} />
        </div>
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
    </>
  );
}
