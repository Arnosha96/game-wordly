import Key from "./key";

type KeyboardProps = {
  onKeyboardInput: (letter: string) => void;
};

const Keyboard = ({ onKeyboardInput }: KeyboardProps) => {
  return (
    <div className="flex flex-col container w-full max-w-lg pb-2 md:pb-5 px-2 mx-auto">
      <div className="flex">
        <Key letter="й" handleClick={(letter) => onKeyboardInput(letter)}></Key>
        <Key letter="ц" handleClick={(letter) => onKeyboardInput(letter)}></Key>
        <Key letter="у" handleClick={(letter) => onKeyboardInput(letter)}></Key>
        <Key letter="к" handleClick={(letter) => onKeyboardInput(letter)}></Key>
        <Key letter="е" handleClick={(letter) => onKeyboardInput(letter)}></Key>
        <Key letter="н" handleClick={(letter) => onKeyboardInput(letter)}></Key>
        <Key letter="г" handleClick={(letter) => onKeyboardInput(letter)}></Key>
        <Key letter="ш" handleClick={(letter) => onKeyboardInput(letter)}></Key>
        <Key letter="щ" handleClick={(letter) => onKeyboardInput(letter)}></Key>
        <Key letter="з" handleClick={(letter) => onKeyboardInput(letter)}></Key>
        <Key letter="х" handleClick={(letter) => onKeyboardInput(letter)}></Key>
        <Key letter="ъ" handleClick={(letter) => onKeyboardInput(letter)}></Key>
      </div>
      <div className="flex">
        <Key letter="ф" handleClick={(letter) => onKeyboardInput(letter)}></Key>
        <Key letter="ы" handleClick={(letter) => onKeyboardInput(letter)}></Key>
        <Key letter="в" handleClick={(letter) => onKeyboardInput(letter)}></Key>
        <Key letter="а" handleClick={(letter) => onKeyboardInput(letter)}></Key>
        <Key letter="п" handleClick={(letter) => onKeyboardInput(letter)}></Key>
        <Key letter="р" handleClick={(letter) => onKeyboardInput(letter)}></Key>
        <Key letter="о" handleClick={(letter) => onKeyboardInput(letter)}></Key>
        <Key letter="л" handleClick={(letter) => onKeyboardInput(letter)}></Key>
        <Key letter="д" handleClick={(letter) => onKeyboardInput(letter)}></Key>
        <Key letter="ж" handleClick={(letter) => onKeyboardInput(letter)}></Key>
        <Key letter="э" handleClick={(letter) => onKeyboardInput(letter)}></Key>
      </div>
      <div className="flex">
        <Key letter="<=" handleClick={(letter) => onKeyboardInput(letter)}></Key>
        <Key letter="я" handleClick={(letter) => onKeyboardInput(letter)}></Key>
        <Key letter="ч" handleClick={(letter) => onKeyboardInput(letter)}></Key>
        <Key letter="с" handleClick={(letter) => onKeyboardInput(letter)}></Key>
        <Key letter="м" handleClick={(letter) => onKeyboardInput(letter)}></Key>
        <Key letter="и" handleClick={(letter) => onKeyboardInput(letter)}></Key>
        <Key letter="т" handleClick={(letter) => onKeyboardInput(letter)}></Key>
        <Key letter="ь" handleClick={(letter) => onKeyboardInput(letter)}></Key>
        <Key letter="б" handleClick={(letter) => onKeyboardInput(letter)}></Key>
        <Key letter="ю" handleClick={(letter) => onKeyboardInput(letter)}></Key>
        <Key letter="ввод" handleClick={(letter) => onKeyboardInput(letter)}></Key>
      </div>
    </div>
  );
};

export default Keyboard;
