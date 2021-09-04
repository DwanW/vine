import styled from "styled-components";
import { DialogContainer, FormFlatButton } from "../container/common.styles";

export const PriorityContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
`;

export const PriorityButton = styled(FormFlatButton)`
  min-width: 120px;
`;

export const PriorityButtonGroup = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  & button {
    width: 80px;
    height: 80px;
    border: none;
    text-transform: uppercase;
    cursor: pointer;
    background-color: lightsteelblue;
    border-radius: 9999px;
  }
`;

export const PriorityDialog = styled(DialogContainer)`
  justify-content: center;
`;
