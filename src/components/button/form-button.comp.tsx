import React, { ReactChild } from "react";
import { FormButton as FormButtonContainer } from "./form-button.styles";

interface Props {
  onClick: () => void;
  children: ReactChild;
}

const FormButton = ({ onClick, children }: Props) => {
  return (
    <FormButtonContainer onClick={onClick}>{children}</FormButtonContainer>
  );
};

export default FormButton;
