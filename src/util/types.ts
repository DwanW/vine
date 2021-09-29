import { Dayjs } from "dayjs";

export type ProgressRecord = {
  recordId: string;
  date: Dayjs;
  value: number;
  isCompleted: boolean;
};

export type LightMonthData = {
  name: string;
  records: number[];
  lightString: string;
  days: number;
};

export type LightData = LightMonthData[];
