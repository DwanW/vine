import Dialog from "@material-ui/core/Dialog";
import { useState } from "react";

interface Props {
  obj: any;
  setObj: (props: any) => void;
}

const PriorityForm = ({ obj, setObj }: Props) => {
  const [isPriorityDialogOpen, setPriorityDialog] = useState(false);
  const changePriority = (value: number) => {
    let updatedObj: { [key: string]: any } = { ...obj };
    updatedObj.priority = value;
    setObj(updatedObj);
    setPriorityDialog(false);
  };
  return (
    <div>
      <span>Priority: {obj.priority}</span>
      <button type="button" onClick={() => setPriorityDialog(true)}>
        Set Priority
      </button>
      <Dialog
        open={isPriorityDialogOpen}
        onClose={() => setPriorityDialog(false)}
      >
        <button onClick={() => changePriority(2)}>high</button>
        <button onClick={() => changePriority(1)}>normal</button>
        <button onClick={() => changePriority(0)}>low</button>
      </Dialog>
    </div>
  );
};

export default PriorityForm;
