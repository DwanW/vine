import Dialog from "@mui/material/Dialog";
import { useState } from "react";
import { IconContainer } from "../container/common.styles";
import {
  PriorityButton,
  PriorityButtonGroup,
  PriorityContainer,
  PriorityDialog,
} from "./priority.styles";

interface Props {
  priority: number;
  setPriority: (props: any) => void;
}

const PriorityForm = ({ priority, setPriority }: Props) => {
  const [isPriorityDialogOpen, setPriorityDialog] = useState(false);
  const changePriority = (value: number) => {
    setPriority(value);
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
        <span>{convertPriorityToString(priority)}</span>
      </PriorityButton>
      <Dialog
        open={isPriorityDialogOpen}
        onClose={() => setPriorityDialog(false)}
      >
        <PriorityDialog>
          <PriorityButtonGroup>
            <button onClick={() => changePriority(2)}>high</button>
            <button onClick={() => changePriority(1)}>normal</button>
            <button onClick={() => changePriority(0)}>low</button>
          </PriorityButtonGroup>
        </PriorityDialog>
      </Dialog>
    </PriorityContainer>
  );
};

export default PriorityForm;
