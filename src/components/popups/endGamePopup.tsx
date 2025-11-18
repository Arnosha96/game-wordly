import { resoultStyleMapper } from "../../mappers/styleMappers";

type EndGamePopupProps = {
  wordBoardLines: string[][];
  popupStatus: "WIN" | "LOSE" | undefined;
};

const EndGamePopup = ({ wordBoardLines, popupStatus }: EndGamePopupProps) => {
  return (
    <div>
      <p>
        {popupStatus === "WIN"
          ? "Поздравляем, Вы выйграли!!!"
          : "Вы проиграли..."}
      </p>
      <div className="mt-2 mb-2">
        {wordBoardLines.map((line, index) => {
          return (
            <div key={index}>
              {line.map((symbol) => {
                const [, color] = symbol.split(":");
                return resoultStyleMapper[color as "G" | "Y" | "B"];
              })}
            </div>
          );
        })}
      </div>
      <hr></hr>
    </div>
  );
};

export default EndGamePopup;
