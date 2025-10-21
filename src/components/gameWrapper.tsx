import { useCallback, useState } from "react";
import Board from "./board/board";
import Header from "./header/header";
import Keyboard from "./keyboard/keyboard";

const GameWrapper = () => {
  const [wordBoard, setWordBoard] = useState<string[][]>(new Array(6).fill([]));
  const [activeLine, setActiveLine] = useState<number>(0);

  const handleKeyboardInput = useCallback(
    (letter: string) => {
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
    },
    [wordBoard, activeLine],
  );

  const handleDelete = useCallback(() => {
    const targetBoard = wordBoard.map((line, index) => {
      if (index === activeLine) line.pop();
      return line;
    });
    setWordBoard(targetBoard);
  }, [wordBoard, activeLine]);

  return (
    <div className="h-screen container mx-auto flex flex-col max-w-md">
      <Header />
      <Board wordBoardLines={wordBoard} />
      <Keyboard onKeyboardInput={handleKeyboardInput} onDelete={handleDelete} />
    </div>
  );
};

export default GameWrapper;
