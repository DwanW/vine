import { Dayjs } from "dayjs";

export interface RoutineObj {
  name: string;
  goal?: string | undefined; //'<3' less than three a day, '=3' exactly 3, '>3' at least 3.
  unit?: string;
  schedule: string; // everyday is '1234567', somedays of a week is eg: weekends's17', times per period is eg: 3times per week '3w', per month '3m', repeat eg: every 10 days is 'e10'
  startdate: Date | Dayjs | null;
  enddate: Date | null;
  reminders: Date[];
  priority: number;
  records: ProgressRecord[];
}

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
