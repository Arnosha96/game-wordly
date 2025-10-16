import Cell from "./cell";

const CellsLine = () => {
  return (
    <div className="flex h-full max-h-20 gap-1 w-full fix-tile-width">
      <Cell letter={"W"} />
      <Cell letter={"O"} />
      <Cell letter={"R"} />
      <Cell letter={"L"} />
      <Cell letter={"D"} />
    </div>
  );
};

export default CellsLine;
