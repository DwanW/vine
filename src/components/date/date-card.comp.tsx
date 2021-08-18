import { ReactElement } from "react";
import { useCurrentDate } from "../../util/hooks";
import { DateCardContainer, MainDate, SubDate } from "./date-card.styles";

export default function DateCard(): ReactElement {
  const { year, month, day, weekday } = useCurrentDate();
  return (
    <DateCardContainer>
      <MainDate>{weekday}</MainDate>
      <SubDate>{`${month} ${day}, ${year}`}</SubDate>
    </DateCardContainer>
  );
}
