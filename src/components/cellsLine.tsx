import Cell from "./cell";

const CellsLine = () => {
  return (
    <div className="flex">
      <Cell letter={"W"} />
      <Cell letter={"O"} />
      <Cell letter={"R"} />
      <Cell letter={"L"} />
      <Cell letter={"D"} />
    </div>
  );
};

export default CellsLine;
