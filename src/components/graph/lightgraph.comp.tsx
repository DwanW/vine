import { composeLightGraphData } from "../../util/validation";
import {
  ColumnContainer,
  Light,
  LightGraphContainer,
} from "./lightgraph.styles";

interface Props {
  routine: any;
}

const LightGraph = ({ routine }: Props) => {
  const data = composeLightGraphData(routine.records);

  const renderData = () => {
    if (!data) {
      return <div>no record found</div>;
    }

    return (
      <LightGraphContainer>
        {data.map((monthData) => (
          <ColumnContainer key={monthData.name}>
            <h4>{monthData.name}</h4>
            <div>
              {monthData.lightString.split("").map((str, idx) => (
                <Light key={monthData.name + idx} lightOn={str === "1"} />
              ))}
            </div>
          </ColumnContainer>
        ))}
      </LightGraphContainer>
    );
  };
  return (
    <div>
      <h4>{routine.name}</h4>
      <div>{renderData()}</div>
    </div>
  );
};

export default LightGraph;
