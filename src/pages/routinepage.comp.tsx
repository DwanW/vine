import RoutineList from "../components/container/routineList.comp";
import PageWrapper from "../components/pagewrapper/pagewrapper.comp";
import { useAppSelector } from "../util/hooks";

interface Props {}

const RoutinePage = (props: Props) => {
  const { routines } = useAppSelector((state) => state.user.currentUser);
  return (
    <PageWrapper>
      <>
        <RoutineList routines={routines} />
      </>
    </PageWrapper>
  );
};

export default RoutinePage;
