import Board from "./board";
import Header from "./header/header";
import Keyboard from "./keyboard/keyboard";

const GameWrapper = () => {
  return (
    <div className="wrapper container mx-auto flex flex-col max-w-md">
      <Header />
      <Board />
      <Keyboard />
    </div>
  );
};

export default GameWrapper;
