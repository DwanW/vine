import { ReactElement, useEffect, useState } from "react";
import FormButton from "../button/form-button.comp";
import { FormDialog } from "../container/common.styles";
import FormSelect from "./formselect.comp";
import { TriggerContainer } from "./mainform.styles";
import RoutineForm from "./routineform.comp";
import TaskForm from "./taskform.comp";

function MainForm(): ReactElement {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [formType, setFormType] = useState<"task" | "routine" | "">("");

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    if (!isDialogOpen) {
      setTimeout(() => setFormType(""), 300);
    }
  }, [isDialogOpen]);

  return (
    <>
      <TriggerContainer>
        <FormButton onClick={() => setIsDialogOpen(true)}>+</FormButton>
      </TriggerContainer>
      <FormDialog
        open={isDialogOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog"
        aria-describedby="form-to-add"
      >
        {formType === "" ? <FormSelect setFormType={setFormType} /> : null}
        {formType === "task" ? (
          <TaskForm closeForm={handleClose} />
        ) : formType === "routine" ? (
          <RoutineForm closeForm={handleClose} />
        ) : null}
      </FormDialog>
    </>
  );
}

export default MainForm;
