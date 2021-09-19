import { Dayjs } from "dayjs";

export type ProgressRecord = {
  recordId: string;
  date: Dayjs;
  value: number;
  isCompleted: boolean;
};
