import clsx from "clsx";

type KeyProps = {
  letter: string;
  handleClick: (letter: string) => void;
  keyStyle: "green" | "yellow" | "grey" | "basic";
};

const styleMap = {
  green: 'bg-[#6AAA64]',
  yellow: 'bg-[#C9B458]',
  grey: 'bg-[#787C7E]',
  basic: 'bg-[#D3D6DA]',
};

const Key = ({ letter, handleClick, keyStyle }: KeyProps) => {
  return (
    <button
      className={clsx(
        styleMap[keyStyle],
        `flex-1 rounded uppercase font-bold p-1 sm:p-2 h-14 small:h-12 tiny:h-10 text-xs m-0.5 mt-1 mb-1 fix-small-iphones-key:h-12`,
      )}
      onClick={() => handleClick(letter)}
    >
      {letter}
    </button>
  );
};

export default Key;
