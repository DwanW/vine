import { composeLightGraphData } from "../../util/validation";

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
      <div>
        {data.map((monthData) => (
          <div key={monthData.name}>
            <h4>{monthData.name}</h4>
            <div>
              {monthData.lightString.split("").map((str, idx) => (
                <div key={monthData.name + idx}>{str}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
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
