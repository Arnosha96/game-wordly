import { useCallback, useEffect, useState } from "react";
import { getRandomWord, words } from "../resources/words";
import Board from "./board/board";
import Header from "./header/header";
import Keyboard from "./keyboard/keyboard";

export type keyboardColorsType = {
  grey: Set<string>;
  yellow: Set<string>;
  green: Set<string>;
};

const GameWrapper = () => {
  const [dayWord, setDayWord] = useState<string>("");
  const [wordBoard, setWordBoard] = useState<string[][]>(new Array(6).fill([]));
  const [activeLine, setActiveLine] = useState<number>(0);
  const [wordsBank, setWordsBank] = useState<string[]>();
  const [gameStatus, setGameStatus] = useState<"In Progress" | "Game Over">(
    "In Progress",
  );
  const [keyboardColors, setKeyboardColors] = useState<keyboardColorsType>({
    grey: new Set(),
    yellow: new Set(),
    green: new Set(),
  });

  const handleKeyboardInput = useCallback(
    (letter: string) => {
      if (gameStatus === "In Progress") {
        const targetBoard = wordBoard.map((arr, index) => {
          if (index === activeLine) {
            return [...arr, letter];
          } else {
            return arr;
          }
        });
        setWordBoard(targetBoard);
      } else return;
    },

    [gameStatus, wordBoard, activeLine],
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

  const validate = useCallback(
    (word: string) => {
      if (word === dayWord) {
        const greenLetters = new Set([
          ...Object.values(keyboardColors.green),
          ...word.split(""),
        ]);
        setKeyboardColors({ ...keyboardColors, green: greenLetters });
        setGameStatus("Game Over");
        return;
      }
      let greenLetters = new Set<string>(keyboardColors.green);
      let yellowLetters = new Set<string>(keyboardColors.yellow);
      let greyLetters = new Set<string>(keyboardColors.grey);

      word.split("").forEach((letter, index) => {
        if (dayWord.includes(letter)) {
          if (letter === dayWord[index]) {
            greenLetters.add(letter);
          } else {
            yellowLetters.add(letter);
          }
        } else {
          greyLetters.add(letter);
        }
      });
      setKeyboardColors({
        ...keyboardColors,
        green: greenLetters,
        yellow: yellowLetters,
        grey: greyLetters,
      });
      if (activeLine === 5) {
        setGameStatus("Game Over");
      } else {
        setActiveLine(activeLine + 1);
      }
    },
    [activeLine, dayWord, keyboardColors],
  );

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
    validate(currentWord);
  }, [wordBoard, activeLine, wordsBank, validate]);

  useEffect(() => {
    setWordsBank(words);
    setDayWord(getRandomWord());
    console.log(dayWord);
  }, [dayWord]);

  return (
    <div className="h-screen container mx-auto flex flex-col max-w-md">
      <Header />
      <Board wordBoardLines={wordBoard} />
      <Keyboard
        onKeyboardInput={handleKeyboardInput}
        onDelete={handleDelete}
        onCheck={handleCheck}
        keyboardColors={keyboardColors}
      />
    </div>
  );
};

export default GameWrapper;
