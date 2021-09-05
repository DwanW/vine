import styled from "styled-components";
import { DialogContainer } from "../container/common.styles";

export const ReminderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
`;

export const ReminderItemContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding-bottom: 0.5rem;
  height: 36px;
`;

export const ButtonGroupContainer = styled.div`
  display: flex;
  justify-content: center;

  & button {
    margin: 1rem 1rem 0;
  }
`;

export const ReminderPickerContainer = styled(DialogContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 85vw;

  @media (min-width: 640px) {
    width: 600px;
  }
`;

export const ReminderDialogContainer = styled(DialogContainer)`
  width: 85vw;

  @media (min-width: 640px) {
    width: 600px;
  }
`;
