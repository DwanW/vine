import { ReactElement, useEffect, useState } from "react";
import FormButton from "../button/form-button.comp";
import FormSelect from "./formselect.comp";
import { MainFormDialog, TriggerContainer } from "./mainform.styles";

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
      <MainFormDialog
        open={isDialogOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog"
        aria-describedby="form-to-add"
      >
        {formType === "" ? <FormSelect setFormType={setFormType} /> : null}
        {formType === "task"
          ? "task form"
          : formType === "routine"
          ? "routine form"
          : null}
      </MainFormDialog>
    </>
  );
}

export default MainForm;
