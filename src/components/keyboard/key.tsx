type KeyProps = {
  letter: string;
  handleClick: (letter: string) => void;
};

const Key = ({ letter, handleClick }: KeyProps) => {
  return (
    <button
      className="
                flex-1 
                rounded 
                uppercase 
                font-bold 
                p-1 
                sm:p-2 
                h-14 
                small:h-12 
                tiny:h-10  
                text-xs 
                m-0.5
                mt-1
                mb-1
                fix-small-iphones-key:h-12    
                bg-gray-300
                "
      onClick={() => handleClick(letter)}
    >
      {letter}
    </button>
  );
};

export default Key;
