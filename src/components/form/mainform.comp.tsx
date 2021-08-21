import { ReactElement } from "react";
import FormButton from "../button/form-button.comp";
import { TriggerContainer } from "./mainform.styles";
interface Props {}

function MainForm({}: Props): ReactElement {
  return (
    <TriggerContainer>
      <FormButton
        onClick={() => {
          console.log("this opens modal");
          return;
        }}
      >
        +
      </FormButton>
    </TriggerContainer>
  );
}

export default MainForm;
