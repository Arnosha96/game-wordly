import { ConfigProvider, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { latinToRussianMapper } from "../mappers/keyMapper";
import { getRandomWord, words } from "../resources/words";
import Board from "./board/board";
import Header from "./header/header";
import Keyboard from "./keyboard/keyboard";
import BadWordByFriendPopup from "./popups/badWordByFriendPopup";
import CreateWordByFriendPopup from "./popups/createWordByFriendPopup";
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
  const currentDay = Math.floor(
    (Date.now() - new Date("11.18.2025").getTime()) / (1000 * 60 * 60 * 24),
  );
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
  const [endGamePopupStates, setEndGamePopupStates] =
    useState<popupStateType>();
  const [createWordByFriendPopupStates, setCreateWordByFriendPopupStates] =
    useState<boolean>();
  const [dayWordByFriend, setDayWordByFriend] = useState<boolean>(false);
  const [badWordByFriendPopupStatus, setBadWordByFriendPopupStatus] =
    useState<boolean>();
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
    (
      word: string,
      currentWordBoard?: string[][],
      currentActiveLine?: number,
    ) => {
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
      if (currentWordBoard && currentActiveLine) {
        setWordBoard(
          currentWordBoard.map((arr, index) =>
            index === currentActiveLine ? result : arr,
          ),
        );
      } else {
        setWordBoard(
          wordBoard.map((arr, index) => (index === activeLine ? result : arr)),
        );
      }

      setKeyboardColors({
        green: greenLetters,
        yellow: yellowLetters,
        black: blackLetters,
      });

      if (word === dayWord) {
        setGameStatus("Game Over");
        setEndGamePopupStates({
          isPopupOpen: true,
          popupStatus: "WIN",
        });
        return;
      }

      if (activeLine === 5) {
        setGameStatus("Game Over");
        setEndGamePopupStates({
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
      if (!dayWordByFriend) {
        localStorage.setItem(
          "gameState",
          JSON.stringify({
            board: wordBoard,
            activeLine: activeLine,
            currentDay: currentDay,
          }),
        );
      }
    }
  }, [
    gameStatus,
    wordBoard,
    activeLine,
    wordsBank,
    validate,
    currentDay,
    messageApi,
    dayWordByFriend,
  ]);
  
  useEffect(() => {
    try {
      setWordsBank(words);
      const pathname = window.location.pathname.split("/").at(-1);
      if (pathname && pathname !== 'game-wordly') {
        const currentDayWord = decodeURIComponent(
          pathname.replaceAll("-", "%"),
        );
        setDayWord(currentDayWord);
        setDayWordByFriend(true);
        if (!wordsBank?.includes(currentDayWord)) {
          setWordsBank((prev) => (!prev ? prev : [...prev, currentDayWord]));
        }
      } else {
        setDayWord(getRandomWord());
      }
    } catch (error) {
      if (error instanceof URIError) {
        setBadWordByFriendPopupStatus(true);
      } else {
        console.error(error);
      }
    }
  }, [wordsBank]);

  useEffect(() => {
    if (wordBoard[0].length === 0 && dayWord !== "" && !dayWordByFriend) {
      const gameState = JSON.parse(localStorage.getItem("gameState") || "{}");
      if (gameState.currentDay === currentDay && gameState.board) {
        setWordBoard(gameState.board);
        setActiveLine(gameState.activeLine);
        validate(
          gameState.board[gameState.activeLine]
            .map((i: string) => i[0])
            .join(""),
          gameState.board,
          gameState.activeLine,
        );
      }
    }
  }, [currentDay, dayWord, validate, wordBoard, dayWordByFriend]);

  useEffect(() => {
    if (!createWordByFriendPopupStates) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (/^[а-яё]$/i.test(e.key)) {
          handleKeyboardInput(e.key);
        } else if (latinToRussianMapper[e.key]) {
          handleKeyboardInput(latinToRussianMapper[e.key]);
        } else if (e.key === "Backspace") {
          handleDelete();
        } else if (e.key === "Enter") {
          handleCheck();
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [
    createWordByFriendPopupStates,
    handleCheck,
    handleDelete,
    handleKeyboardInput,
  ]);

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
      <Header
        currentDay={currentDay}
        dayWordByFriend={dayWordByFriend}
        createWordByFriend={() => setCreateWordByFriendPopupStates(true)}
      />
      <Board wordBoardLines={wordBoard} />
      <Keyboard
        onKeyboardInput={handleKeyboardInput}
        onDelete={handleDelete}
        onCheck={handleCheck}
        keyboardColors={keyboardColors}
      />
      <EndGamePopup
        title={`WORDLE DAY #${currentDay} ${activeLine + 1}/6`}
        isPopupOpen={endGamePopupStates?.isPopupOpen}
        onCancel={() => setEndGamePopupStates(undefined)}
        wordBoardLines={wordBoard}
        popupStatus={endGamePopupStates?.popupStatus}
      />
      <BadWordByFriendPopup
        isPopupOpen={badWordByFriendPopupStatus}
        onCancel={() => setBadWordByFriendPopupStatus(false)}
      />
      <CreateWordByFriendPopup
        isPopupOpen={createWordByFriendPopupStates}
        onCancel={() => setCreateWordByFriendPopupStates(false)}
        messageApi={messageApi}
      />
    </div>
  );
};

export default GameWrapper;
