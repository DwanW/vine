import { composeLightGraphData } from "../../util/validation";
import { ColumnContainer, LightGraphContainer } from "./lightgraph.styles";

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
                <div key={monthData.name + idx}>{str}</div>
              ))}
            </div>
          </ColumnContainer>
        ))}
      </LightGraphContainer>
    );
  };
  return (
    <div>
      <h2>lightgraph</h2>
      <div>{renderData()}</div>
    </div>
  );
};

export default LightGraph;
