import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Flex, Space } from "antd";

type headerProps = {
  currentDay: number;
  dayWordByFriend: boolean;
  createWordByFriend: () => void;
};

const Header = ({
  currentDay,
  dayWordByFriend,
  createWordByFriend,
}: headerProps) => {
  return (
    <header className="flex flex-row max-w-lg py-2 px-3 border-b dark:border-neutral-700">
      <div className="flex-auto text-center">
        <div className="uppercase font-extrabold text-2xl small:text-xl tiny:text-base tracking-wider">
          <Flex className="w-full" gap="middle" justify="center" align="center">
            <Button
              icon={
                <Space className="w-full h-full mt-1" align="center">
                  <PlusCircleOutlined style={{ fontSize: "20px" }} />
                </Space>
              }
              variant="link"
              color="default"
              onClick={createWordByFriend}
            ></Button>
            WORDLE {dayWordByFriend ? " BY FRIEND" : " #" + currentDay}
          </Flex>
        </div>
      </div>
    </header>
  );
};

export default Header;
