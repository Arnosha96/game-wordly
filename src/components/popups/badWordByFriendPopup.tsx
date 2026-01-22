import { Button, Modal, Space } from "antd";

type BadWordByFriendPopupProps = {
  isPopupOpen: boolean | undefined;
  onCancel: () => void;
};

const BadWordByFriendPopup = ({
  isPopupOpen,
  onCancel,
}: BadWordByFriendPopupProps) => {
  return (
    <Modal
      width={360}
      title={
        <Space className="w-full" direction="vertical" align="center">
          ЭТО СЛОВО НЕ ПОДДЕРЖИВАЕТСЯ
        </Space>
      }
      open={isPopupOpen}
      onCancel={onCancel}
      footer={
        <Space className="w-full" direction="vertical" align="center">
          <Button key="back" onClick={onCancel}>
            Отгадать слово дня
          </Button>
        </Space>
      }
    >
      <Space className="w-full" direction="vertical" align="center">
        Упс! К сожалению, это слово не поддерживается.{" "}
      </Space>
    </Modal>
  );
};

export default BadWordByFriendPopup;
