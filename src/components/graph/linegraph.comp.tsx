import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Label,
  ResponsiveContainer,
} from "recharts";
import { composeLineGraphData } from "../../util/validation";
import { GraphContainer } from "./graph.styles";

interface Props {
  routine: any;
}

const LineGraph = ({ routine }: Props) => {
  const { records, startdate } = routine;
  return (
    <GraphContainer>
      <h4>Cumulative Progress</h4>
      <ResponsiveContainer width={"100%"} height={300}>
        <LineChart
          width={400}
          height={300}
          data={composeLineGraphData(records, startdate)}
        >
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="date" type="number" allowDecimals={false} height={50}>
            <Label
              value={"days since the start date"}
              position="insideBottom"
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
      </ResponsiveContainer>
    </GraphContainer>
  );
};

export default LineGraph;
