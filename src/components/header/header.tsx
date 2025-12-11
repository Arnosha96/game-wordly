type headerProps = {
  currentDay: number;
};

const Header = ({ currentDay }: headerProps) => {
  return (
    <header className="flex flex-row max-w-lg py-2 px-3 border-b dark:border-neutral-700">
      <div className="flex-auto text-center">
        <div className="uppercase font-extrabold text-2xl small:text-xl tiny:text-base tracking-wider">
          WORDLE #{currentDay}
        </div>
      </div>
    </header>
  );
};

export default Header;
