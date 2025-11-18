import clsx from "clsx";
import { letterStyleMapper } from "../../mappers/styleMappers";

type KeyProps = {
  letter: string;
  handleClick: (letter: string) => void;
  keyStyle: "G" | "Y" | "B" | "D";
};

const Key = ({ letter, handleClick, keyStyle }: KeyProps) => {
  return (
    <button
      className={clsx(
        letterStyleMapper[keyStyle],
        `flex-1 rounded uppercase font-bold p-1 sm:p-2 h-14 small:h-12 tiny:h-10 text-xs m-0.5 mt-1 mb-1 fix-small-iphones-key:h-12`,
      )}
      onClick={() => handleClick(letter)}
    >
      {letter}
    </button>
  );
};

export default Key;
