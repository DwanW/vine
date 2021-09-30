import { useState } from "react";
import { Cell, Pie, PieChart, Sector, Tooltip } from "recharts";
import { composePieGraphData } from "../../util/validation";
import { GraphContainer } from "./graph.styles";

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`Progress: ${payload.name}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Percentage: ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

interface Props {
  routine: any;
}
const PieGraph = ({ routine }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <GraphContainer>
      <h4>Progress Completion</h4>
      <PieChart width={730} height={250}>
        <Pie
          data={composePieGraphData(
            routine.records,
            routine.schedule,
            routine.startdate
          )}
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          dataKey="percentage"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          onMouseEnter={onPieEnter}
        >
          <Cell key="completed" fill="#66bb6a" />
          <Cell key="uncompleted" fill="#bdbdbd" />
        </Pie>
      </PieChart>
    </GraphContainer>
  );
};

export default PieGraph;
