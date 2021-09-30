import LineGraph from "../components/graph/linegraph.comp";
import PieGraph from "../components/graph/piegraph.comp";
import PageWrapper from "../components/pagewrapper/pagewrapper.comp";
import { useRoutineFromRoute } from "../util/hooks";

interface Props {}

const StatsPage = (props: Props) => {
  const routine = useRoutineFromRoute();

  return (
    <PageWrapper>
      <>
        <h4>
          this is the stats page, showing different data graph of the routine
        </h4>
        <LineGraph routine={routine} />
        <PieGraph routine={routine} />
      </>
    </PageWrapper>
  );
};

export default StatsPage;
