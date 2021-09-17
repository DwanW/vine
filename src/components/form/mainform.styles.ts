import styled from "styled-components";
import Dialog from "@mui/material/Dialog";

export const TriggerContainer = styled.div`
  position: fixed;
  width: 100vw;
  bottom: 50px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 1rem;

  @media (min-width: 640px) {
    width: 144px;
    height: 100vh;
    padding: 1.5rem;
    border-left: 1px aqua solid;
    right: 10px;
    bottom: auto;
  }
`;

export const MainFormDialog = styled(Dialog)`
  & .MuiDialog-paper {
    margin: 0;
  }
`;
