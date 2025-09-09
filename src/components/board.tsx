import CellsLine from "./cellsLine";

const Board = () => {
  return (
    <div className="flex flex-col">
      <CellsLine />
      <CellsLine />
      <CellsLine />
      <CellsLine />
      <CellsLine />
      <CellsLine />
    </div>
  );
};

export default Board;
