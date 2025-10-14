import Board from "./board";
import Keyboard from "./keyboard/keyboard";

const GameWrapper = () => {
  return (
    <div className="wrapper container mx-auto flex flex-col max-w-md">
      <Board />
      <Keyboard />
    </div>
  );
};

export default GameWrapper;
