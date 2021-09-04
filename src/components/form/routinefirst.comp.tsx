import SelectButton from "../button/select-button.comp";
import { FlexColumnContainer } from "../container/common.styles";

interface Props {
  setIsNumeric: (props: any) => void;
  setActiveStep: (props: any) => void;
  activeStep: number;
}

const RoutineFirstStep = ({
  setIsNumeric,
  setActiveStep,
  activeStep,
}: Props) => {
  return (
    <FlexColumnContainer>
      <SelectButton
        onClick={() => {
          setIsNumeric(false);
          setActiveStep(activeStep + 1);
        }}
        mainText="With A Yes Or No"
        description="Individual task that you would like to track the completion only."
        src="/assets/icon/boolean.svg"
      />
      <SelectButton
        onClick={() => {
          setIsNumeric(true);
          setActiveStep(activeStep + 1);
        }}
        mainText="With A Numeric Value"
        description="Individual task that you would like to track the completion only."
        src="/assets/icon/numeric.svg"
      />
    </FlexColumnContainer>
  );
};

export default RoutineFirstStep;
