import CellsLine from "./cellsLine";

const Board = () => {
  return (
    <main className="flex flex-auto justify-center items-center">
      <div className="flex flex-col gap-1 p-3 box-border h-full min-h-60 w-full max-w-[360px] max-h-[480px]">
        <CellsLine />
        <CellsLine />
        <CellsLine />
        <CellsLine />
        <CellsLine />
        <CellsLine />
      </div>
    </main>
  );
};

export default Board;
