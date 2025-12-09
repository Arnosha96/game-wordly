import { useEffect, useState } from "react";
import Cell from "./cell";

type CellsLineProps = {
  line: string[];
};

const CellsLine = ({ line }: CellsLineProps) => {
  const [targetLine, setTargetLine] = useState<string[]>(new Array(5));

  useEffect(() => {
    const length = line.length;
    const preLine: string[] = [
      ...line,
      ...new Array<string>(5 - length).fill(""),
    ];
    setTargetLine(preLine);
  }, [line, setTargetLine]);

  return (
    <div className="flex h-full max-h-20 gap-1 w-full fix-tile-width">
      {targetLine.map((symbol, index) => {
        const [letter, color] = symbol.split(":");
        return (
          <Cell
            key={index}
            indexInLine={index}
            letter={letter}
            cellColor={color ? (color as "G" | "Y" | "B" | "D") : "D"}
          />
        );
      })}
    </div>
  );
};

export default CellsLine;
