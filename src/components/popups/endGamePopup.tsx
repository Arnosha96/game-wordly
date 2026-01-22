import { Modal } from "antd";
import EndGamePopupContent from "./endGamePopupContent";

type EndGamePopupProps = {
  title: string;
  isPopupOpen: boolean | undefined;
  onCancel: () => void;
  wordBoardLines: string[][];
  popupStatus: "WIN" | "LOSE" | undefined;
};

const EndGamePopup = ({
  title,
  isPopupOpen,
  onCancel,
  wordBoardLines,
  popupStatus,
}: EndGamePopupProps) => {
  return (
    <Modal title={title} open={isPopupOpen} onCancel={onCancel} footer={null}>
      <EndGamePopupContent
        wordBoardLines={wordBoardLines}
        popupStatus={popupStatus}
      />
    </Modal>
  );
};

export default EndGamePopup;
