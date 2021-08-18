import { ReactElement } from "react";
import { useCurrentDate } from "../../util/hooks";
import { DateCardContainer, MainDate, SubDate } from "./date-card.styles";

interface Props {}

export default function DateCard({}: Props): ReactElement {
  const { year, month, day, weekday } = useCurrentDate();
  return (
    <DateCardContainer>
      <MainDate>{weekday}</MainDate>
      <SubDate>{`${month} ${day}, ${year}`}</SubDate>
    </DateCardContainer>
  );
}
