import { ConfirmDialog } from "./confirm.styles";

interface Props {
  open: boolean;
  message: string | null;
  onClose: () => void;
  dispatch: () => void;
}

const Confirm = ({ open, message, onClose, dispatch }: Props) => {
  const handleDispatch = () => {
    dispatch();
    onClose();
  };
  return (
    <ConfirmDialog open={open} onClose={onClose}>
      <div>
        <h2>this is a confirm dialog</h2>
        <div>are you sure you would like to perform the following action?</div>
        <div>{message}</div>
        <button onClick={onClose}>Cancel</button>
        <button onClick={handleDispatch}>Yes</button>
      </div>
    </ConfirmDialog>
  );
};

export default Confirm;
