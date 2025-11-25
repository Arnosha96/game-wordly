import clsx from "clsx";
import { letterStyleMapper } from "../../mappers/styleMappers";

type CellProps = {
  letter: string | undefined;
  cellColor: "G" | "Y" | "B" | "D";
  indexInLine: number;
};

const Cell = ({ letter, cellColor, indexInLine }: CellProps) => {
  return (
    <div
      className={clsx(
        cellColor === "D"
          ? "text-black border-2"
          : [
              letterStyleMapper[cellColor],
              "text-white animate-spin-slow",
            ],
        `w-full 
        h-full 
        inline-flex 
        justify-center 
        items-center 
        text-4xl 
        tiny:text-xl 
        small:text-3xl 
        uppercase 
        font-bold 
        select-none 
        border-neutral-300 
        dark:text-white 
        dark:border-neutral-700
        `,
      )}
      style={
        cellColor !== "D"
          ? { animationDelay: `${indexInLine * 0.5}s`, backfaceVisibility: "hidden"}
          : undefined
      }
    >
      {letter}
    </div>
  );
};

export default Cell;
