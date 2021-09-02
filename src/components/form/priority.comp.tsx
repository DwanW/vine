import Dialog from "@material-ui/core/Dialog";
import { useState } from "react";
import { DialogContainer, IconContainer } from "../container/common.styles";
import {
  PriorityButton,
  PriorityButtonGroup,
  PriorityContainer,
} from "./priority.styles";

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

  const convertPriorityToString = (priority: number) => {
    switch (priority) {
      case 0:
        return "Low";
      case 1:
        return "Normal";
      case 2:
        return "High";
    }
  };
  return (
    <PriorityContainer>
      <IconContainer>
        <img src="assets/icon/priority.svg" alt="priority setting" />
        <span>Priority</span>
      </IconContainer>
      <PriorityButton type="button" onClick={() => setPriorityDialog(true)}>
        <span>{convertPriorityToString(obj.priority)}</span>
      </PriorityButton>
      <Dialog
        open={isPriorityDialogOpen}
        onClose={() => setPriorityDialog(false)}
      >
        <DialogContainer>
          <PriorityButtonGroup>
            <button onClick={() => changePriority(2)}>high</button>
            <button onClick={() => changePriority(1)}>normal</button>
            <button onClick={() => changePriority(0)}>low</button>
          </PriorityButtonGroup>
        </DialogContainer>
      </Dialog>
    </PriorityContainer>
  );
};

export default PriorityForm;
