import StepLabel from "@mui/material/StepLabel";
import styled from "styled-components";

export const AltStepLabel = styled(StepLabel)`
  svg.Mui-active {
    color: #17c7a1;
  }
  svg.Mui-completed {
    color: #17c7a1;
  }
`;

export const RoutineStepperContainer = styled.div`
  & .MuiStepper-root {
    padding: 24px 0;
  }
`;
