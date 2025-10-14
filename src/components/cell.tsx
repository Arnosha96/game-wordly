type CellProps = {
  letter: string | undefined;
};

const Cell = ({ letter }: CellProps) => {
  return (
    <div
      className="
        w-full 
        h-full inline-flex 
        justify-center 
        items-center 
        text-4xl 
        tiny:text-xl 
        small:text-3xl 
        uppercase 
        font-bold 
        select-none 
        border-2 
        border-neutral-300 
        dark:text-white 
        dark:border-neutral-700
      "
    >
      {letter}
    </div>
  );
};

export default Cell;
