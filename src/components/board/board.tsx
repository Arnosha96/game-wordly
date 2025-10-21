import { useEffect } from "react";
import CellsLine from "./cellsLine";

type BoardProps = {
  wordBoardLines: string[][];
};

const Board = ({ wordBoardLines }: BoardProps) => {
  useEffect(() => {}, [wordBoardLines]);
  return (
    <main className="flex flex-auto justify-center items-center">
      <div className="flex flex-col gap-1 p-3 box-border h-full min-h-60 w-full max-w-[360px] max-h-[480px]">
        {wordBoardLines.map((arr, index) => (
          <CellsLine key={index} line={arr} />
        ))}
      </div>
    </main>
  );
};

export default Board;
