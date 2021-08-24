import Dialog from "@material-ui/core/Dialog";
import { Dispatch, SetStateAction, useState } from "react";
import { TaskObj } from "./taskform.comp";

interface Props {
  task: TaskObj;
  setTask: Dispatch<SetStateAction<TaskObj>>;
}

const PriorityForm = ({ task, setTask }: Props) => {
  const [isPriorityDialogOpen, setPriorityDialog] = useState(false);
  const changePriority = (value: number) => {
    let updatedTask: { [key: string]: any } = { ...task };
    updatedTask.priority = value;
    setTask(updatedTask as TaskObj);
    setPriorityDialog(false);
  };
  return (
    <div>
      <span>Priority: {task.priority}</span>
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
