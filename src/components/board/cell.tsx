import clsx from "clsx";
import { useEffect, useState } from "react";
import { letterStyleMapper } from "../../mappers/styleMappers";

type CellProps = {
  letter: string | undefined;
  cellColor: "G" | "Y" | "B" | "D";
  qweasd: number;
};

const Cell = ({ letter, cellColor, qweasd }: CellProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (cellColor !== 'D') {
      setTimeout(() => {
        setIsFlipped(true);
      }, qweasd * 200);
    }
  }, [cellColor, qweasd]);

  return (
    <div
      className="react-card-flip"
      style={{ perspective: 1000, zIndex: "auto", width: "100%" }}
    >
      <div
        className="react-card-flipper"
        style={{ height: "100%", position: "relative", width: "100%" }}
      >
        <div
          className="react-card-front"
          style={{
            ...{
              backfaceVisibility: "hidden",
              height: "100%",
              left: 0,
              top: 0,
              transformStyle: "preserve-3d",
              transition: "0.6s",
              width: "100%",
              zIndex: 2,
            },
            ...(!isFlipped
              ? { transform: "rotateX(0deg)", position: "relative" }
              : { transform: "rotateX(180deg)", position: "absolute" }),
          }}
        >
          <div className="w-full h-full inline-flex justify-center items-center text-4xl tiny:text-xl small:text-3xl uppercase font-bold select-none border-2 border-neutral-300 dark:text-white dark:border-neutral-700">
            {letter}
          </div>
        </div>
        <div
          className="react-card-back"
          style={{
            ...{
              backfaceVisibility: "hidden",
              height: "100%",
              left: 0,
              top: 0,
              transformStyle: "preserve-3d",
              transition: "0.9s",
              width: "100%",
            },
            ...(!isFlipped
              ? { transform: "rotateX(-180deg)", position: "absolute" }
              : { transform: "rotateX(0deg)", position: "relative" }),
          }}
        >
          <div
            className={clsx(
              letterStyleMapper[cellColor],
              `w-full h-full inline-flex justify-center items-center text-4xl tiny:text-xl small:text-3xl uppercase font-bold select-none text-white`,
            )}
          >
            {letter}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cell;
