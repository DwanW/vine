import LightGraph from "../components/graph/lightgraph.comp";
import PageWrapper from "../components/pagewrapper/pagewrapper.comp";
import { useRoutineFromRoute } from "../util/hooks";

interface Props {}

const LightPage = (props: Props) => {
  const routine = useRoutineFromRoute();

  return (
    <PageWrapper>
      <div>
        this is the light page, showing light graph of the routine
        <LightGraph routine={routine} />
      </div>
    </PageWrapper>
  );
};

export default LightPage;
