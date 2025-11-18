import { ConfigProvider, message, Modal } from "antd";
import { useCallback, useEffect, useState } from "react";
import { getRandomWord, words } from "../resources/words";
import Board from "./board/board";
import Header from "./header/header";
import Keyboard from "./keyboard/keyboard";
import EndGamePopup from "./popups/endGamePopup";

export type keyboardColorsType = {
  black: Set<string>;
  yellow: Set<string>;
  green: Set<string>;
};

export type popupStateType = {
  isPopupOpen?: boolean;
  popupStatus: "WIN" | "LOSE";
};

const GameWrapper = () => {
  const startDate = new Date("11.18.2025");
  const [dayWord, setDayWord] = useState<string>("");
  const [wordBoard, setWordBoard] = useState<string[][]>(new Array(6).fill([]));
  const [activeLine, setActiveLine] = useState<number>(0);
  const [wordsBank, setWordsBank] = useState<string[]>();
  const [gameStatus, setGameStatus] = useState<"In Progress" | "Game Over">(
    "In Progress",
  );
  const [keyboardColors, setKeyboardColors] = useState<keyboardColorsType>({
    black: new Set(),
    yellow: new Set(),
    green: new Set(),
  });
  const [popupStates, setPopupStates] = useState<popupStateType>();
  const [messageApi, contextHolder] = message.useMessage();

  const handleKeyboardInput = useCallback(
    (letter: string) => {
      if (gameStatus === "In Progress" && wordBoard[activeLine].length !== 5) {
        const targetBoard = wordBoard.map((arr, index) =>
          index === activeLine ? [...arr, letter] : arr,
        );
        setWordBoard(targetBoard);
      } else return;
    },

    [gameStatus, wordBoard, activeLine],
  );

  const handleDelete = useCallback(() => {
    if (gameStatus === "In Progress") {
      const targetBoard = wordBoard.map((line, index) =>
        index === activeLine ? line.slice(0, -1) : line,
      );
      setWordBoard(targetBoard);
    }
  }, [wordBoard, activeLine, gameStatus]);

  const validate = useCallback(
    (word: string) => {
      const greenLetters = keyboardColors.green;
      const yellowLetters = keyboardColors.yellow;
      const blackLetters = keyboardColors.black;

      const target = dayWord.split("");
      const guess = word.split("");
      const result: string[] = new Array(5);

      const remainingLetters: string[] = [];

      for (let i = 0; i < 5; i++) {
        if (guess[i] === target[i]) {
          result[i] = `${guess[i]}:G`;
          greenLetters.add(guess[i]);
          target[i] = "";
        } else {
          remainingLetters.push(target[i]);
        }
      }

      for (let i = 0; i < 5; i++) {
        if (result[i]) continue;

        const letterIndex = remainingLetters.indexOf(guess[i]);
        if (letterIndex !== -1) {
          result[i] = `${guess[i]}:Y`;
          yellowLetters.add(guess[i]);
          remainingLetters.splice(letterIndex, 1);
        } else {
          result[i] = `${guess[i]}:B`;
          blackLetters.add(guess[i]);
        }
      }

      setWordBoard(
        wordBoard.map((arr, index) => (index === activeLine ? result : arr)),
      );

      setKeyboardColors({
        green: greenLetters,
        yellow: yellowLetters,
        black: blackLetters,
      });

      if (word === dayWord) {
        setGameStatus("Game Over");
        setPopupStates({
          isPopupOpen: true,
          popupStatus: "WIN",
        });
        return;
      }

      if (activeLine === 5) {
        setGameStatus("Game Over");
        setPopupStates({
          isPopupOpen: true,
          popupStatus: "LOSE",
        });
      } else {
        setActiveLine(activeLine + 1);
      }
    },
    [activeLine, dayWord, keyboardColors, wordBoard],
  );

  const handleCheck = useCallback(() => {
    if (gameStatus === "In Progress") {
      if (wordBoard[activeLine].length < 5) {
        messageApi.open({
          content: "В слове недостаточно букв!",
        });
        return;
      }
      const currentWord = wordBoard[activeLine].join("");
      if (!wordsBank?.includes(currentWord)) {
        messageApi.open({
          content:
            "В словаре игры нет такого слова, попробуйте другое слово! Например ПОКЕР",
        });
        return;
      }
      validate(currentWord);
    }
  }, [wordBoard, activeLine, wordsBank, validate, messageApi, gameStatus]);

  useEffect(() => {
    setWordsBank(words);
    setDayWord(getRandomWord());
    console.log(dayWord);
  }, [dayWord]);

  return (
    <div className="h-screen container mx-auto flex flex-col max-w-md">
      <ConfigProvider
        theme={{
          components: {
            Message: {
              contentBg: "black",
              colorText: "white",
            },
          },
        }}
      >
        {contextHolder}
      </ConfigProvider>
      <Header />
      <Board wordBoardLines={wordBoard} />
      <Keyboard
        onKeyboardInput={handleKeyboardInput}
        onDelete={handleDelete}
        onCheck={handleCheck}
        keyboardColors={keyboardColors}
      />
      <Modal
        title={`WORDLE DAY #${startDate.getDay()} ${activeLine + 1}/6`}
        closable={{ "aria-label": "Custom Close Button" }}
        open={popupStates?.isPopupOpen}
        onCancel={() => setPopupStates(undefined)}
        footer={null}
      >
        <EndGamePopup wordBoardLines={wordBoard} popupStatus={popupStates?.popupStatus} />
      </Modal>
    </div>
  );
};

export default GameWrapper;
