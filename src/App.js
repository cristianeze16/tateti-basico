import './App.css';
import {React,useState} from 'react';

const CELL_SIZE = 190 ;

const winningCellStyle = {
  backgroundColor: "yellow",
  border: "5px solid red",
};


const Circle = () => (
  <svg width={CELL_SIZE} height={CELL_SIZE}>
    <circle
      cx={CELL_SIZE / 2}
      cy={CELL_SIZE / 2}
      r={CELL_SIZE / 2 - 5}
      stroke="white"
      strokeWidth={5}
      fill="transparent"
    />
  </svg>
);

const Cross = () => (
  <svg width={CELL_SIZE} height={CELL_SIZE}>
    <line x1={5} y1={5} x2={CELL_SIZE - 5} y2={CELL_SIZE - 5} stroke="black" strokeWidth={5} />
    <line x1={CELL_SIZE - 5} y1={5} x2={5} y2={CELL_SIZE - 5} stroke="black" strokeWidth={5} />
  </svg>
);

const Cell = ({ value, onClick }) => (
  <button className='grid-individual' onClick={onClick}>
    {value === 'O' && <Circle />}
    {value === 'X' && <Cross />}
  </button>
);


// Función que revisa si hay un ganador en el tablero dado
const checkForWin = board => {
  // Verifica las filas
  for (let i = 0; i < 3; i++) {
    if (board[i * 3] === board[i * 3 + 1] && board[i * 3 + 1] === board[i * 3 + 2]) {
      // Si hay una fila completa con el mismo valor, devuelve ese valor
      return board[i * 3];
    }
  }

  // Verifica las columnas
  for (let i = 0; i < 3; i++) {
    if (board[i] === board[i + 3] && board[i + 3] === board[i + 6]) {
      // Si hay una columna completa con el mismo valor, devuelve ese valor
      return board[i];
    }
  }

  // Verifica las diagonales
  if (board[0] === board[4] && board[4] === board[8]) {
    // Si hay una diagonal completa con el mismo valor, devuelve ese valor
    return board[0];
  }
  if (board[2] === board[4] && board[4] === board[6]) {
    // Si hay una diagonal completa con el mismo valor, devuelve ese valor
    return board[2];
  }

  // Si no hay ninguna fila, columna o diagonal completa con el mismo valor, devuelve null
  return null;
};



const Board = ({ board, onCellClick,found }) => (
  
  <div className="board">
    {
      
    }
    {board.map((cell, index) => (
      
      <Cell key={index} value={cell} onClick={() => onCellClick(index)} 
       style ={ found ? winningCellStyle :{} }
        />

    ))}

  </div>
);

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const winner = checkForWin(board)
  const found= board.includes(winner)
  const handleCellClick = index => {
    if (board[index] !== null) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };
  console.log(found)
  
  return (
    <div >
      <Board board={board} onCellClick={handleCellClick} found={found}/>
    </div>
  );
};





export default App;
