import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Label,
} from "recharts";
import { composeLineGraphData } from "../../util/validation";
import { LineGraphContainer } from "./graph.styles";

interface Props {
  routine: any;
}

const LineGraph = ({ routine }: Props) => {
  const { records, startdate } = routine;
  return (
    <LineGraphContainer>
      <h4>Cumulative Progress</h4>
      <LineChart
        width={500}
        height={360}
        data={composeLineGraphData(records, startdate)}
      >
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="date" type="number" allowDecimals={false}>
          <Label
            value={"days since the start date"}
            position="insideBottom"
            offset={0}
          />
        </XAxis>
        <YAxis>
          <Label
            value={routine.unit ? routine.unit : "times"}
            position="insideLeft"
            offset={20}
            angle={-90}
          />
        </YAxis>
        <Tooltip />
      </LineChart>
    </LineGraphContainer>
  );
};

export default LineGraph;
