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
          ? ["text-black", "border-neutral-300"]
          : [
              `bg-[${letterStyleMapper[cellColor]}]`,
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
        border-2
        select-none 
        dark:text-white 
        `,
      )}
      style={
        cellColor !== "D"
          ? {
              animationDelay: `${indexInLine * 0.4}s`,
              borderColor: `${letterStyleMapper[cellColor]}`,
            }
          : undefined
      }
    >
      {letter}
    </div>
  );
};

export default Cell;
