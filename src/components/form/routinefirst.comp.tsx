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
    <div>
      <button
        onClick={() => {
          setIsNumeric(false);
          setActiveStep(activeStep + 1);
        }}
      >
        With A Yes Or No
      </button>
      <button
        onClick={() => {
          setIsNumeric(true);
          setActiveStep(activeStep + 1);
        }}
      >
        With A Numeric Value
      </button>
    </div>
  );
};

export default RoutineFirstStep;
