import { useState } from "react";
import Board from "./board/board";
import Header from "./header/header";
import Keyboard from "./keyboard/keyboard";

const GameWrapper = () => {
  const [wordBoard, setWordBoard] = useState<string[][]>(new Array(7).fill([]));
  const [activeLine, setActiveLine] = useState<number>(0);

  const handleKeyboardInput = (letter: string) => {
    if (wordBoard[activeLine].length < 5) {
      const targetBoard = wordBoard.map((arr, index) => {
        if (index === activeLine) {
          return [...arr, letter];
        } else {
          return arr;
        }
      });
      setWordBoard(targetBoard);
    }
  };

  return (
    <div className="h-screen container mx-auto flex flex-col max-w-md">
      <Header />
      <Board wordBoardLines={wordBoard} />
      <Keyboard onKeyboardInput={handleKeyboardInput} />
    </div>
  );
};

export default GameWrapper;
