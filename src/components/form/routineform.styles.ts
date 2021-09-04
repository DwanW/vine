import StepLabel from "@material-ui/core/StepLabel";
import styled from "styled-components";

export const AltStepLabel = styled(StepLabel)`
  .MuiStepIcon-root.MuiStepIcon-active {
    color: #17c7a1;
  }
  .MuiStepIcon-root.MuiStepIcon-completed {
    color: #17c7a1;
  }
`;

export const RoutineStepperContainer = styled.div`
  & .MuiStepper-root {
    padding: 24px 0;
  }
`;
