import PageWrapper from "../components/pagewrapper/pagewrapper.comp";
import { useRoutineFromRoute } from "../util/hooks";

interface Props {}

const StatsPage = (props: Props) => {
  const routine = useRoutineFromRoute();
  console.log(routine);
  return (
    <PageWrapper>
      this is the stats page, showing different data graph of the routine
    </PageWrapper>
  );
};

export default StatsPage;
