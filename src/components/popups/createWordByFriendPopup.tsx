import { Button, Flex, Form, Input, Modal, Space } from "antd";
import { MessageInstance } from "antd/es/message/interface";

type CreateWordByFriendPopupProps = {
  isPopupOpen: boolean | undefined;
  onCancel: () => void;
  messageApi: MessageInstance;
};

const CreateWordByFriendPopup = ({
  isPopupOpen,
  onCancel,
  messageApi,
}: CreateWordByFriendPopupProps) => {
  const [form] = Form.useForm();
  const handleCreateWordByFriend = async () => {
    const value = await form.validateFields();
    const url = `${window.location.origin}/game-wordly?word_id=${btoa(encodeURIComponent(value.word))}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        messageApi.open({
          content: "Ccылка скопирована в буфер обмена.",
        });
      })
      .catch((err) => {
        messageApi.open({
          content: "Не получилось создать ссылку.",
        });
      });
  };

  return (
    <Modal
      width={360}
      title={
        <Space className="w-full" direction="vertical" align="center">
          ЗАГАДАТЬ СЛОВО ДРУГУ
        </Space>
      }
      open={isPopupOpen}
      onCancel={onCancel}
      centered
      styles={{ mask: { backgroundColor: "#111827cc" } }}
      footer={
        <Space className="w-full" direction="vertical" align="center">
          <Button
            color="green"
            variant="solid"
            size="large"
            onClick={handleCreateWordByFriend}
          >
            Скопировать
          </Button>
        </Space>
      }
    >
      <Flex vertical={true} gap={16}>
        <p className="text-center">
          Бросьте вызов другу с любым словом на русском языке из 5 букв.
        </p>
        <Form form={form} name="basic">
          <Form.Item
            name="word"
            rules={[
              {
                required: true,
                message: "Введите слово из 5 букв кириллицей!",
                max: 5,
                pattern: /^[А-Яа-яЁё]{5}$/,
              },
            ]}
          >
            <Input
              size="large"
              placeholder="Введите слово из 5 букв кириллицей!"
            />
          </Form.Item>
        </Form>
      </Flex>
    </Modal>
  );
};

export default CreateWordByFriendPopup;
