import { keyboardColorsType } from "../gameWrapper";
import Key from "./key";

type KeyboardProps = {
  onKeyboardInput: (letter: string) => void;
  onDelete: () => void;
  onCheck: () => void;
  keyboardColors: keyboardColorsType;
};

const Keyboard = ({
  onKeyboardInput,
  onDelete,
  onCheck,
  keyboardColors,
}: KeyboardProps) => {
  const firstLine = [
    "й",
    "ц",
    "у",
    "к",
    "е",
    "н",
    "г",
    "ш",
    "щ",
    "з",
    "х",
    "ъ",
  ];
  const middleLine = ["ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э"];
  const lastLine = ["я", "ч", "с", "м", "и", "т", "ь", "б", "ю"];

  const keyStyleCheck = (symbol: string) => {
    return keyboardColors.green.has(symbol)
      ? "green"
      : keyboardColors.yellow.has(symbol)
        ? "yellow"
        : keyboardColors.grey.has(symbol)
          ? "grey"
          : 'basic';
  };

  return (
    <div className="flex flex-col container w-full max-w-lg pb-2 md:pb-5 px-2 mx-auto">
      <div className="flex">
        {firstLine.map((symbol, index) => {
          return (
            <Key
              key={index}
              letter={symbol}
              handleClick={(letter) => onKeyboardInput(letter)}
              keyStyle={keyStyleCheck(symbol)}
            ></Key>
          );
        })}
      </div>
      <div className="flex">
        {middleLine.map((symbol, index) => (
          <Key
            key={index}
            letter={symbol}
            handleClick={(letter) => onKeyboardInput(letter)}
            keyStyle={keyStyleCheck(symbol)}
          ></Key>
        ))}
      </div>
      <div className="flex">
        <Key letter="<=" handleClick={onDelete} keyStyle="basic"></Key>
        {lastLine.map((symbol, index) => (
          <Key
            key={index}
            letter={symbol}
            handleClick={(letter) => onKeyboardInput(letter)}
            keyStyle={keyStyleCheck(symbol)}
          ></Key>
        ))}
        <Key letter="ввод" handleClick={onCheck} keyStyle="basic"></Key>
      </div>
    </div>
  );
};

export default Keyboard;
