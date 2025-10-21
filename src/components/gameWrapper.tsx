import { useCallback, useEffect, useState } from "react";
import Board from "./board/board";
import Header from "./header/header";
import Keyboard from "./keyboard/keyboard";
import { words } from "../resources/words";

const GameWrapper = () => {
  const [dayWord, setDayWord] = useState<string>();
  const [wordBoard, setWordBoard] = useState<string[][]>(new Array(6).fill([]));
  const [activeLine, setActiveLine] = useState<number>(0);
  const [wordsBank, setWordsBank] = useState<string[]>();

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
      if (index === activeLine) {
        return line.slice(0, -1);
      } else {
        return line;
      }
    });
    setWordBoard(targetBoard);
  }, [wordBoard, activeLine]);

  const handleCheck = useCallback(() => {
    if (wordBoard[activeLine].length < 5) {
      alert("В слове недостаточно букв" + wordBoard[activeLine].length);
      return;
    }
    const currentWord = wordBoard[activeLine].join("");
    if (!wordsBank?.includes(currentWord)) {
      alert(
        "В словаре игры нет такого слова, попробуйте другое слово! Например ПОКЕР",
      );
      return;
    }
    validation(currentWord);
  }, [wordBoard, activeLine, wordsBank]);

  const validation = useCallback(
    (word: string) => {
      setActiveLine(activeLine + 1);
    },
    [activeLine],
  );

  useEffect(() => {
    setWordsBank(words);
  }, []);

  return (
    <div className="h-screen container mx-auto flex flex-col max-w-md">
      <Header />
      <Board wordBoardLines={wordBoard} />
      <Keyboard
        onKeyboardInput={handleKeyboardInput}
        onDelete={handleDelete}
        onCheck={handleCheck}
      />
    </div>
  );
};

export default GameWrapper;
