import UpdateForm from "../components/form/updateform.comp";
import PageWrapper from "../components/pagewrapper/pagewrapper.comp";
import { useRoutineFromRoute } from "../util/hooks";

interface Props {}

const UpdatePage = (props: Props) => {
  const routine = useRoutineFromRoute();

  return (
    <PageWrapper>
      <>
        <h4>Routine: {routine.name}</h4>
        <UpdateForm routine={routine} />
      </>
    </PageWrapper>
  );
};

export default UpdatePage;
