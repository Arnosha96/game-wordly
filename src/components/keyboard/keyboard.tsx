import Key from "./key";

type KeyboardProps = {
  onKeyboardInput: (letter: string) => void;
  onDelete: () => void;
  onCheck: () => void;
};

const Keyboard = ({ onKeyboardInput, onDelete, onCheck }: KeyboardProps) => {
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
  return (
    <div className="flex flex-col container w-full max-w-lg pb-2 md:pb-5 px-2 mx-auto">
      <div className="flex">
        {firstLine.map((symbol, index) => (
          <Key
            key={index}
            letter={symbol}
            handleClick={(letter) => onKeyboardInput(letter)}
          ></Key>
        ))}
      </div>
      <div className="flex">
        {middleLine.map((symbol, index) => (
          <Key
            key={index}
            letter={symbol}
            handleClick={(letter) => onKeyboardInput(letter)}
          ></Key>
        ))}
      </div>
      <div className="flex">
        <Key letter="<=" handleClick={onDelete}></Key>
        {lastLine.map((symbol, index) => (
          <Key
            key={index}
            letter={symbol}
            handleClick={(letter) => onKeyboardInput(letter)}
          ></Key>
        ))}
        <Key letter="ввод" handleClick={onCheck}></Key>
      </div>
    </div>
  );
};

export default Keyboard;
